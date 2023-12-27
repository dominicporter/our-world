import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';

export class OurWorldApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const ourWorldApi = new lambda.Function(this, 'ourWorldApi', {
            code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
            handler: 'graphql.handler',
            runtime: lambda.Runtime.NODEJS_16_X,
        });

        new apiGateway.LambdaRestApi(this, 'graphqlEndpoint', {
            handler: ourWorldApi,
        });
    }
}