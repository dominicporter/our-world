import { resolvers, typeDefs } from "./resolvers";

const { ApolloServer } = require("apollo-server-lambda");

// TODO: #1 add a login mechanism and Auth header
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
