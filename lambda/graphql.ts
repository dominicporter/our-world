import { resolvers, typeDefs } from "./resolvers";

const { ApolloServer } = require("apollo-server-lambda");

const server = new ApolloServer({
  typeDefs,
  resolvers,
    // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
