# Our World API

This is an Apollo Server based GraphQL API which is deployed to an AWS Lambda and DynamoDB table using CDK. 

In summary:

- `npm i` in top level and lambda dirs
- `npm run build`
- `npx cdk deploy` (having set up your AWS creds)


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
