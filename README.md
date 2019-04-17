

# Product Listing App
Product Listing App with api server in node.js, mysql as db and web client in react.js.

## Project Structure
```
        .
        ├── api-gateway                 #  Nginx Api Gateway
        ├── db                          #  MySQL data directory
        ├── deployment                  #  Deployment config
        |   ├── development             #  Docker-compose development config
        |   └── production              #  Docker-Compose production config
        └── README.md                   #  This file
```

## API Sheet
```
## Postman api collection
https://documenter.getpostman.com/view/401954/S17uunKr

```

## Environment Variables
```

## Environment variables are defined in the deployment/development/docker-compose.yml
## Environment variables are needed for successfull startup of the server

SERVER_PORT=8080                        # Port number for server to listen
MONGO_HOST=mongo:27017                  # MongoDB connection url
MONGO_DB_NAME=dateweaver-india          # MongoDB database name

```


## Development
```
# Start project in development mode with hot code loading,
cd deployment/development && docker-compose up --build [-d]

# See logs for a container (service in docker-compose)
cd deployemnt/development && docker-compose logs --follow <service_name>

# Get container (service) shell access
cd deployment/development && docker-compose exec <service_name> sh

# Enjoy developing :)
```

## Production
```
# Start project in production mode,
cd deployment/production && docker-compose up --build

# Open web browser at http://localhost/api/v1/health
# You will see a response : { data: '' }, response_status: 200
```


## Feedback
In case of any query or feedback, please feel free to connect via
* arpit.go4@gmail.com (Arpit Goyal)

Or, open an issue at github.
