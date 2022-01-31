import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { applyMiddleware } from "graphql-middleware";
const { makeExecutableSchema } = require("@graphql-tools/schema");

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { permisions } from "./permisions";

const port = process.env.PORT || 4000;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const startServer = async () => {
  const server = new ApolloServer({
    schema: applyMiddleware(schema, permisions),
    context({ req }) {
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

  await app.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};
