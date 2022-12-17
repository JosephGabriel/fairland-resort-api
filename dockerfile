FROM node:16-alpine

USER root

WORKDIR /app/ 

COPY package*.json /app/

RUN npm install 

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start" ]