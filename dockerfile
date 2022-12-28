FROM node:16-bullseye-slim

RUN mkdir -p /app

WORKDIR /app/

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start" ]