
FROM arpitgo4/alpine-node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

ENV PORT=8080
ENV NODE_DEVELOPMENT=production

EXPOSE $PORT

CMD [ "npm", "start" ]