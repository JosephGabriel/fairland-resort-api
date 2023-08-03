import { Server } from 'http';

declare global {
  let expressServer: Server;

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
