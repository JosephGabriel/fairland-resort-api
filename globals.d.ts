import { Server } from "http";

declare global {
  var expressServer: Server;
}

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: "production" | "development" | "testing";
    SENDGRID_API_KEY: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
  }
}
