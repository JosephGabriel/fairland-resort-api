import { createSchema, createYoga, YogaInitialContext } from "graphql-yoga";
import { applyMiddleware } from "graphql-middleware";
import { PrismaClient, User } from "@prisma/client";
import express from "express";
import cors from "cors";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { permisions } from "./permisions";

import { upload, uploadHotelImages, uploadUserAvatar } from "./utils/upload";

export const prisma = new PrismaClient();

export interface ServerContext extends YogaInitialContext {
  prisma: PrismaClient;
  user: User;
}

const schema = createSchema({
  typeDefs,
  resolvers,
});

export const yoga = createYoga<ServerContext>({
  schema: applyMiddleware(schema, permisions),
  context: (context) => ({
    prisma,
    ...context,
  }),
});

export const app = express();

app.use(cors());

app.use(express.static("uploads"));

// @ts-ignore
app.use(yoga.graphqlEndpoint, yoga);

app.post("/uploads/avatar", upload.single("avatar"), uploadUserAvatar);

app.post(
  "/uploads/hotel",
  upload.fields([{ name: "logo" }, { name: "thumbnail" }, { name: "photos" }]),
  uploadHotelImages
);
