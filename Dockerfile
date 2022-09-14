FROM node:lts

WORKDIR /app

COPY . .
COPY ./package.json .

RUN yarn
