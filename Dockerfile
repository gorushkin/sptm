FROM node:14.17-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src/ ./src
COPY .env ./

RUN npm install
RUN npm run build

CMD npm run start
