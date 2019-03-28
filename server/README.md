
# Express-MongoDB-Scaffold [![Build Status](https://travis-ci.org/arpitgo4/React-Redux-Scaffold.svg?branch=master)](https://travis-ci.org/arpitgo4/React-Redux-Scaffold)
Server side scaffold with Express-MongoDB. Scaffold supports production and development modes, with **Best Developer Experience** ( DX ) by Hot-Reloading for the server side changes. Docker, Typescript and production best practices are all baked in.

## Scaffold Structure 

```
	.
	├── bin                     	#  server config directory
	├── config		        #  server dependencies config
        ├── controllers          	#  api controllers
	├── dist                      	#  Compiled files
	├── middlewares              	#  express middlewares
	├── models             		#  mongoose models
	├── routes 			#  api routes    
	├── tests            		#  unit tests
	├── types          		#  typescript custom types
	├── utils            		#  utility methods
	├── .dockerignore           	#  docker ignore files
	├── .env                	#  environment variables (only for demo, don't commit in production)
	├── .gitignore               	#  git commit ignore files
	├── app.ts 			#  express app
	├── Dockerfile			#  docker build script
	├── nodemon.json            	#  nodemon config for development mode
	├── package.json              	#  backend dependencies
	├── README.md                 	#  This file
	├── tsconfig.json               #  typescript compiler config
	└── tslint.json	                #  typescript linter config
```

## Environment Variables
```

## All environment variables are needed for successfull startup of the server

SERVER_PORT=8080                        # Port number for server to listen
MONGO_HOST=mongo_cluster_ip:27017       # MongoDB connection url
MONGO_DB_NAME=express-mongodb           # MongoDB database name
REDIS_HOST=redis_cluster_ip:6379        # Redis connection url
JWT_SECRET=<base64 encoded string>      # Secret for signing JWT tokens
JWT_HEADER=x-token                      # Request header for JWT tokens
JWT_TOKEN_TTL=20m                       # JWT token time to live
```


## Development
```	
# Start client in development mode with hot code loading,
docker run --rm -it -p 8080:8080 -v $(pwd):/usr/src/app arpitgo4/alpine-node

# Inside docker container,
cd /usr/src/app 
npm run start:development

# Open web browser at http://localhost:8080/api/v1/health
# Hit api server to get api response in the postman, enjoy developing :)
```

## Production
```
# Docker image build
docker build -t express-mongodb-scaffold .

# Start the project
docker run --rm --name express-mongodb-scaffold -d -p 8080:8080 express-mongodb-scaffold

# Open web browser at http://localhost:8080/api/v1/health
# You will see a health response from server
```

## Feedback
In case of any query or feedback, please feel free to connect via
* arpit.go4@gmail.com (Arpit Goyal)

Or, open an issue at github.
