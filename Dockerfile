FROM node:12.18-stretch-slim

RUN apt-get update
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libxss1 fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils

RUN yarn global add webpack
RUN yarn add -D webpack-cli

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock*", "npm-shrinkwrap.json*", "./"]

RUN yarn

COPY . .

RUN yarn build

EXPOSE 2000
CMD yarn start
