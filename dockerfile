FROM node:16-bullseye-slim

USER root

RUN mkdir -p /app

WORKDIR /app

COPY --chown=root:root package.json .

RUN npm install

COPY --chown=root:root . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start" ]