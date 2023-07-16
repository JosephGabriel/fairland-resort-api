import { PrismaClient, User } from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';
import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import express from 'express';
import cors from 'cors';

import { permisions } from './permisions';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';

import {
  upload,
  uploadImage,
  uploadImages,
  uploadUserAvatar,
} from './utils/upload';

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

app.use(express.static('uploads'));

// @ts-expect-error ...
app.use(yoga.graphqlEndpoint, yoga);

app.post('/uploads/avatar', upload.single('avatar'), uploadUserAvatar);

app.post('/uploads/file', upload.single('file'), uploadImage);

app.post('/uploads/files', upload.fields([{ name: 'files' }]), uploadImages);
