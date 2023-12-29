import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class OurWorldApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ecoActionsTable = new dynamodb.Table(this, 'OurWorldEcoActions', {
      partitionKey: { name: 'itemId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change as needed for your use case
    });

    const ourWorldApi = new lambda.Function(this, 'ourWorldApi', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      handler: 'graphql.handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      timeout: cdk.Duration.seconds(30),
      environment: {
        ACTIONS_TABLE_NAME: ecoActionsTable.tableName,
      }
    });

    ecoActionsTable.grantReadWriteData(ourWorldApi);

    new apiGateway.LambdaRestApi(this, 'graphqlEndpoint', {
      handler: ourWorldApi,
    });
  }
}
