FROM node:16-bullseye-slim

WORKDIR /app/ 

COPY package*.json /app/

RUN npm install --production 

COPY . .

RUN npx prisma generate

RUN npm run build

ENV APOLLO_KEY=service:venus-api-my6z8:5OwbQh51Y8mvXSwU_Gq2Ww

ENV APOLLO_GRAPH_REF=venus-api-my6z8@current

ENV APOLLO_SCHEMA_REPORTING=true

ENV PORT=5000

ENV JWT_EXPIRES_IN=7d

ENV JWT_SECRET=venus

ENV DATABASE_URL=postgres://venususer:venuspassword@database:5432/venusdb?connect_timeout=300

CMD ["npm", "start" ]