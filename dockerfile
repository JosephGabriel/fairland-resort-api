FROM node:14-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

EXPOSE 5000

COPY . .

RUN npx prisma generate

# RUN npx prisma migrate deploy

CMD ["npm","start"]