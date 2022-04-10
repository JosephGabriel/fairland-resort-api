import dotenv from "dotenv";
import { startServer } from "../src";

export default async () => {
  dotenv.config();

  const { server, expressServer } = await startServer();

  global.apolloServer = server;
  global.expressServer = expressServer;
};
