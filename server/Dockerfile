FROM node:17-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY ./ ./
# RUN npm build

#FROM node:17-alpine as runner
EXPOSE 3000

# wtf GCP Cloud Run just wouldn't accept CMD ["node", "./src/index.js"]?
# > /bin/sh: [node,: not found
CMD node ./src/index.js
