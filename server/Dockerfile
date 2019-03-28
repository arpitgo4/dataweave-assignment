
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
ENV SENDGRID_API_KEY=some_api_key
ENV JWT_SECRET=U5ZnTwt0tpmUHAVhES51iXM52mFSbxsOojFs5JNnZUv082ZACjnsuRNklomA
ENV JWT_HEADER=x-token
ENV API_GATEWAY=api_gateway_ip

EXPOSE $PORT

CMD [ "npm", "start" ]