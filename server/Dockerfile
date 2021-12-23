FROM node:17-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY ./ ./

EXPOSE 3000

# wtf GCP Cloud Run just wouldn't accept CMD ["node", "./src/index.js"]?
# > /bin/sh: [node,: not found
CMD node ./src/index.js
