import dotenv from "dotenv";

import { startServer } from "./index";

if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

startServer();
