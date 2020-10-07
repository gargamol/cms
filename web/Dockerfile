# dev-stage
FROM node:14-alpine AS dev-stage
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
# `yarn install` will run every time we start the container. We're using yarn because it's much faster than npm when there's nothing new to install
CMD ["sh", "-c", "yarn install && yarn dev"]

# production-stage
FROM node:14-alpine AS production-stage
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .
