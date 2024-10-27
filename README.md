# quote-generator-rest
API that shows a random quote from a database

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 20.18.0

# Getting started
- Clone the repository
```
git clone  https://github.com/Yvanlfdth/quote-generator-rest.git
```
- Install dependencies
```
cd quote-generator-rest
npm install
```
- Clone .env.example file to new .env file
- Set your own `DATABASE_USERNAME` and `DATABASE_PASSWORD` in .env
- Change any other information (like `DATABASE_NAME`) if necessary
- If not already done, create a mongodb database (default name `quote_generator`) and a user that match the .env information

- Run the project
```
npm run dev
```

# Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from the build.                                     |
| **node_modules**         | Contains all npm dependencies                                                             |
| **src**                  | Contains source code that will be compiled to the dist dir                               |
| **src/controllers**      | Controllers define functions to serve various express routes.                            |
| **src/routes**           | Contain all express routes, separated by module/area of application                      |
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src**/index.ts         | Entry point to express app                                                               |
| server.ts                | Entry point to the whole app that makes the server running                               |
| package.json             | Contains npm dependencies as well as build scripts  |
| tsconfig.json            | Config settings for compiling source code only and paths definition    |