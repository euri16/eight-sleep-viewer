# Eight Sleep Viewer

ReactJS app to visualize the sleep data from the Eight Sleep users in a very easy and beautiful way.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

In order to install the project you only need Docker, if you want to do a manual install, you will need npm installed on your machine. This project was developed using the version `17.12.0-ce, build c97c6d6` of Docker.

You can find instructions to install Docker on your favorite platform in this link: [https://docs.docker.com/install](https://docs.docker.com/install)

### Installing

Once you get Docker installed on your machine is very easy to have the project up and running on your machine:

Go to the project folder and deploy the apps using `docker-compose`:

```
docker-compose up -d --build
```

This can take several minutes depending on your network connection performance.

Once the command completes all the operations the project is officially up and running. To test the web app open your browser and go to:

````
http://localhost:3003/
````

The API will be running in the following address:

````
http://localhost:3000/
````

You don't need to perform any operation in order to make them work together.

## Running the tests

//TODO (create more tests)

To run the tests, just move to the frontend folder and execute this command:
````
cd frontend
npm test
````

## Authors

* **Eury Pérez** - *Initial work* 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.