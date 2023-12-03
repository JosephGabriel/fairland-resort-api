import { PrismaClient } from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';
import { createSchema, createYoga } from 'graphql-yoga';
import express, { RequestHandler } from 'express';
import cors from 'cors';

import { useApolloTracing } from '@envelop/apollo-tracing';

import playground from 'graphql-playground-middleware-express';

import { permissions } from './permissions';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';

import { ServerContext } from '../globals';

export const prisma = new PrismaClient();

const schema = createSchema({
  typeDefs,
  resolvers,
});

export const yoga = createYoga<ServerContext>({
  schema: applyMiddleware(schema, permissions),
  healthCheckEndpoint: '/live',
  plugins: [useApolloTracing()],
  context: (context) => ({
    prisma,
    ...context,
  }),
});

export const app = express();

app.use(cors());

app.use(express.static('uploads'));

app.get(
  '/',
  playground({
    endpoint: yoga.graphqlEndpoint,
  })
);

app.use(yoga.graphqlEndpoint, yoga as RequestHandler);
