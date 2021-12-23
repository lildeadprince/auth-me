FROM node:17-alpine as builder

WORKDIR /usr/src/app

# from workspaces root
COPY ./package*.json ./
COPY ./server/package*.json ./server
RUN npm ci -w server

COPY ./server ./server

#FROM node:17-alpine as runner
EXPOSE 3000

# wtf GCP Cloud Run just wouldn't accept CMD ["node", "./src/index.js"]?
# > /bin/sh: [node,: not found
CMD node ./src/index.js
