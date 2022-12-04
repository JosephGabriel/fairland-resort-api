FROM node:16-alpine

USER root

RUN mkdir /app && chown root:root /app

WORKDIR /app/

RUN npm cache clean --force  

COPY package*.json /app/

RUN npm install 

COPY . .

RUN npm run build 

RUN npx prisma migrate deploy

CMD ["npm", "start" ]