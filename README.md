# docker-dev-env

## First steps
Before start using docker-compose, build the images and run the services individually to install npm packages
- Open the console on project folder

- First create the images running `docker-compose build`

- For the application service, run `docker-compose run app-server bash`. Then, inside the container, run `npm i` to install all packages.

- For the api service, run `docker-compose run api-server bash`. Then, inside the container, run `npm i` to install all packages.

## Usage
To start the environment, run `docker-compose up -d` to run all services together. Services will run in develop mode and will restart in all changes done to the code.
To stop the environment, run `docker-compose down` to stop the services. 

## CLI access
If necessary to access a container to run commands, execute `docker-compose exec <service-name> bash` and cli will access the container.