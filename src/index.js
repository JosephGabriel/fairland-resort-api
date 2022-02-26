import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { applyMiddleware } from "graphql-middleware";
const { makeExecutableSchema } = require("@graphql-tools/schema");
import { PrismaClient } from "@prisma/client";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { permisions } from "./permisions";

const prisma = new PrismaClient();

const port = process.env.PORT || 4000;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermisions = applyMiddleware(schema, permisions);

export const startServer = async () => {
  const server = new ApolloServer({
    schema: schemaWithPermisions,
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    debug: process.env.NODE_ENV !== "production",
    context({ req }) {
      return {
        req,
        prisma,
      };
    },
  });

  const app = express();

  app.use(server.graphqlPath, graphqlUploadExpress());

  app.use(express.static("public"));

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};
