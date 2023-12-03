import { PrismaClient, User } from '@prisma/client';
import { YogaInitialContext } from 'graphql-yoga';

export interface ServerContext extends YogaInitialContext {
  prisma: PrismaClient;
  user: User;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: 'production' | 'development' | 'testing';
      SENDGRID_API_KEY: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {};
