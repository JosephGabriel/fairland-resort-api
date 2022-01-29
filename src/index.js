import { ApolloServer } from "apollo-server-express";
import express from "express";

export const startServer = async (typeDefs, resolvers, context, port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  const app = express();

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port }, resolve));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};
