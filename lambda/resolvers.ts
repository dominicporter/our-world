const { gql } = require("apollo-server-lambda");
import { DynamoDB } from 'aws-sdk';

const ecoActions = ["Walked Instead", "Plant-based meal"]
export const typeDefs = gql`
  type Query {
    ecoActions: [String]
  }
`;
const getEcoActionsFromDDB = async () => {
  // Query data from DynamoDB
  const dynamoDB = new DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.ACTIONS_TABLE_NAME || '', // Use the table name from environment variables
    Key: {
      itemId: '123', // Provide the specific key to query
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
};

