import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { PrismaClient, User } from "@prisma/client";
import express from "express";
import cors from "cors";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { permisions } from "./permisions";

export const prisma = new PrismaClient();

const port = process.env.PORT || 4000;

export interface ServerContext extends ExpressContext {
  prisma: PrismaClient;
  user: User;
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermisions = applyMiddleware(schema, permisions);

export const startServer = async () => {
  const server = new ApolloServer<ServerContext>({
    schema: schemaWithPermisions,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    debug: process.env.NODE_ENV !== "production",
    context: ({ req, res }) => ({
      prisma,
      req,
      res,
    }),
  });

  const app = express();

  app.use(cors());

  app.use(server.graphqlPath, graphqlUploadExpress());

  app.use(express.static("public"));

  await server.start();

  server.applyMiddleware({ app });

  const expressServer = app.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });

  return { expressServer, server };
};
