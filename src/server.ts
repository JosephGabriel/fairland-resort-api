import dotenv from 'dotenv';

import { app, yoga } from '@src/.';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${yoga.graphqlEndpoint}`
  );
});
