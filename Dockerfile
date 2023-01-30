FROM node:18.12-alpine3.15

RUN apk update && apk add bash
RUN npm install -g npm@latest

USER node
COPY --chown=node:node . /home/node/app

WORKDIR /home/node/app
