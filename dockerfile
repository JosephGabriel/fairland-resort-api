FROM node:16-bullseye-slim

WORKDIR /app/ 

COPY package*.json /app/

RUN npm install 

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start" ]