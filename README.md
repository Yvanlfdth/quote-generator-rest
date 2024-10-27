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

- The first time you run the app, you should run the following route to populate the database for authors, quotes and tags collections (replace .env variables with your own data):
```
http://${SERVER}:{PORT}/setup/db/init
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
| package.json             | Contains npm dependencies as well as build scripts                                       |
| tsconfig.json            | Config settings for compiling source code only and paths definition                      |

# App purpose
The app is designed to get random quotes, with (not required) filters. To get random quotes, use one of this routes:

## To get multiple quotes
```
http://${SERVER}:{PORT}/quotes/random
```

This returns an array of quote objects

## To get only one quote
```
http://${SERVER}:{PORT}/random
```

OR

```
http://${SERVER}:{PORT}/quotes/random/one
```

Those return one quote object. The 2 routes exactly do the same thing.

## Filters
You can use those filters if you want more specific quotes:

 Filter | Type | Description |
| ------------------------- | -------|----------------------------------------------------------------------------------------------------------------- |
| `limit`                   | Number | Limits the number of quotes returned (min: 1, max: 50). Used only for multiple quotes                            |
| `minLength`               | Number | Sets the minimum length of quotes content to search                                                              |
| `maxLength`               | Number | Sets the maximum length of quotes content to search                                                              |
| `tags`                    | String | Tags separated by a comma (find quotes that have all the tags) or a pipe (find quotes that have any of the tags) |
| `author`                  | String | list of authors separated by a pipe (find quotes that have any of the authors), can be a name or a slug          |
| `authorId`                | String | Same as `author` but contains author ids (if not empty, the `author` filter is ignored)                          |

# Data CRUD

## Authentication
First create a user in the users collections with the following information:
- username: the name to log in
- password: password crypted by using bcrypt
- role: admin

Then edit .env file `JWT_SECRET_KEY` with your own key.

Finally log in with your credentials using this route:
```
http://${SERVER}:{PORT}/auth/login
```