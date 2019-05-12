FROM node:10-alpine

ENV NODE_ENV production

RUN apk add --no-cache chromium

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json

RUN cd /app && npm ci

COPY src /app

RUN chmod -R 755 /app && chown -R node /app && ln -s /app/index.js /usr/local/bin/checkLighthouseFailures

USER node
