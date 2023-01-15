import dotenv from "dotenv";

import { app, yoga } from "./index";

if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${yoga.graphqlEndpoint}`
  );
});
