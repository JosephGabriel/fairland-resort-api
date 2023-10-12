import dotenv from 'dotenv';

import { app } from './index';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
