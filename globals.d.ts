import { ApolloServer, ExpressContext } from "apollo-server-express";
import { Server } from "http";

declare global {
  var apolloServer: ApolloServer<ExpressContext>;
  var expressServer: Server;
}
