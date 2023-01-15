import dotenv from "dotenv";
import { app, yoga } from "../src";

export default async () => {
  dotenv.config();

  const port = process.env.PORT || 4000;

  global.expressServer = app.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${yoga.graphqlEndpoint}`
    );
  });
};
