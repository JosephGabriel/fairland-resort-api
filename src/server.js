import dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client";

import { startServer } from "./index";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

if (process.env.NODE_ENV === "development") {
  dotenv.config();
}
// const prisma = new PrismaClient();

const context = {
  // prisma,
};

const port = process.env.PORT || 4000;

startServer(typeDefs, resolvers, context, port);
