# dev-stage
FROM node:12.16.3 AS dev-stage
WORKDIR /app
COPY package.json ./
COPY . .
# `yarn install` will run every time we start the container. We're using yarn because it's much faster than npm when there's nothing new to install
CMD ["sh", "-c", "yarn install && yarn dev"]

# production-stage
FROM node:12.16.3 AS production-stage
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
CMD ["sh", "-c", "yarn start"]
