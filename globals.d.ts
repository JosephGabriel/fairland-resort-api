import { PrismaClient, User } from '@prisma/client';
import { YogaInitialContext } from 'graphql-yoga';
import { Server } from 'http';

export interface ServerContext extends YogaInitialContext {
  prisma: PrismaClient;
  user: User;
}

declare global {
  let expressServer: Server;

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: 'production' | 'development' | 'testing';
      SENDGRID_API_KEY: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      BUCKET_URL: string;
      BUCKET_REGION: string;
      BUCKET_NAME: string;
      S3_ACCESS_KEY: string;
      S3_SECRET_KEY: string;
    }
  }
}

export {};
