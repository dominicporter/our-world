const { gql } = require("apollo-server-lambda");
import { DynamoDB } from 'aws-sdk';

const ecoActions = ["Walked Instead", "Plant-based meal"]
export const typeDefs = gql`
  type Query {
    ecoActions: [String]
  }
`;

// TODO: #2 Extract userId from Auth token or similar
const getUserId = () => '123';

const getEcoActionsFromDDB = async () => {
  const dynamoDB = new DynamoDB.DocumentClient();
  const userId = await getUserId()
  const params = {
    TableName: process.env.ACTIONS_TABLE_NAME || '', // Use the table name from environment variables
    Key: {
      userId,
    },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    console.log('DynamoDB Query Result:', result);

    return result.Item?.ecoActions
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
  }
}

export const resolvers = {
    Query: {
        ecoActions: () => getEcoActionsFromDDB(),
    },
    // TODO: #3 add a mutation which logs an action
};

