

# Node-React-Scaffold [![Build Status](https://travis-ci.org/arpitgo4/React-Redux-Scaffold.svg?branch=master)](https://travis-ci.org/arpitgo4/React-Redux-Scaffold)
Full stack javascript scaffold with MongoDB-Express-React-Node (MERN). Scaffold supports production and development modes, with **Best Developer Experience** ( DX ) by Hot-Reloading for the server side and client side changes. Docker, Typescript and production best practices are all baked in. Deployment script are provided for development and production environments with Docker-Compose and Kubernetes respectively.

## Scaffold Structure

```
        .
        ├── api-gateway                 #  Nginx Api Gateway
        ├── db                          #  MongoDB data directory
        ├── deployment                  #  Deployment config
        |   ├── development             #  Docker-compose development config
        |   └── production              #  Kubernetes production config
        ├── .env                        #  environment variables
        ├── .gitignore                  #  git commit ignore files
        ├── README.md                   #  This file
        └── setup.js                    #  Scaffold setup script
```

## Environment Variables
```

## Environment variables are defined in the deployment/development/docker-compose.yml

## Environment variables are needed for successfull startup of the server

SERVER_PORT=8080                        # Port number for server to listen
MONGO_HOST=mongo_cluster_ip:27017       # MongoDB connection url
MONGO_DB_NAME=express-mongodb           # MongoDB database name
REDIS_HOST=redis_cluster_ip:6379        # Redis connection url
JWT_SECRET=<base64 encoded string>      # Secret for signing JWT tokens
JWT_HEADER=x-token                      # Request header for JWT tokens
JWT_TOKEN_TTL=20m                       # JWT token time to live


## Environment variables are needed for successfull startup of the client

## TODO

```


## Development
```	
# Start client in development mode with hot code loading,
cd deployment/development && docker-compose up --build [-d]

# See logs for a container (service in docker-compose)
cd deployemnt/development && docker-compose logs --follow <service_name>

# Get container (service) shell access
cd deployment/development && docker-compose exec <service_name> sh

# Open web browser at [for api-server] http://localhost/api/v1/health
# Open web browser at [for react-app] http://localhost
# Enjoy developing :)
```

## Production
```

## TODO

# Docker image build
docker build -t express-mongodb-scaffold .

# Start the project
docker run --rm --name express-mongodb-scaffold -d -p 8080:8080 express-mongodb-scaffold

# Open web browser at http://localhost/api/v1/health
# You will see a sample Single Page Application
```

## Development
```	
## Start the system in development mode with hot code loading
docker-compose up --build

## To start the system in background 
docker-compose up --build -d

## To see the running logs of the system
docker-compose logs --follow

## To see the running logs of a service
docker-compose logs --follow <service_name_1> <service_name_2>

## List all the running containers
docker-compose ps -a OR docker ps -a

## To enter into any running container (docker-compose)
docker-compose exec <service_name> sh

## To enter into any running container (docker)
docker exec -it <container_id> /bin/[sh|bash]

## Stop the system
docker-compose down
```
Refer to the docker-compose.yml script for detailed information.


## API Sheet
```
## Postman api collection

https://documenter.getpostman.com/view/401954/S17uunKr

```


## Feedback
In case of any query or feedback, please feel free to connect via
* arpit.go4@gmail.com (Arpit Goyal)

Or, open an issue at github.