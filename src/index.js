import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const port = process.env.PORT || 4000;

export const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context(req) {
      return {
        req,
      };
    },
  });

  const app = express();

  app.use(server.graphqlPath, graphqlUploadExpress());

  app.use(express.static("public"));

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port }, resolve));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};
