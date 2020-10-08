FROM node:12.16.3
WORKDIR /app
ENV NODE_ENV production
ENV YARN_CACHE_FOLDER /yarn

ADD . /app/
RUN mkdir -p $YARN_CACHE_FOLDER
RUN yarn --production --pure-lockfile

WORKDIR /app
ENTRYPOINT [ "node", "/app/src/index.js" ]
