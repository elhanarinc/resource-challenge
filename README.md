# Zeplin Challenge
[ ![Codeship Status for elhanarinc/zeplin-challenge](https://app.codeship.com/projects/934fa2a0-ebd4-0136-7732-1e7f26f7d3eb/status?branch=master)](https://app.codeship.com/projects/319916)

Zeplin coding challenge written with Node.js/Express.js Framework.

This project assumes you had already installed these tools:
1. [node.js](https://nodejs.org/en/)
2. [express.js](https://expressjs.com/)

Third party packages, tools, etc.
1. [dotenv](https://www.npmjs.com/package/dotenv) for reading environment variables.
2. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for user authentication.
3. [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing.
4. [mongoose](https://www.npmjs.com/package/mongoose) for ORM.
5. [nodemon](https://www.npmjs.com/package/nodemon) for auto restarting and persistent uptime.

In order to use API, you need a mongodb instance which could be on local your machine or [mongoDB-Atlas](https://cloud.mongodb.com). After that you need to create four different collections.
* Collection used for `users` endpoint
* Collection used for `resource` endpoint
* Test replica of `users`
* Test replica of `resource`

I have used an `.env` file for the project in order to seperate `test` and `production` environments and sample configuration for sample `.env` file:

```
DB_CONN_USERNAME=user
DB_CONN_PASS=password

DB_CONN_URL=sample_mongo_url
DB_CONN_DBNAME=sample_database_name

DB_COLL_RESOURCE_TEST=resource-test
DB_COLL_RESOURCE_PROD=resource

DB_COLL_USERS_TEST=users-test
DB_COLL_USERS_PROD=users

JWT_SECRET=sample-jwt-secret
```

Below are the commands that is need for running the API:
* `npm start` for production
* `npm test` for running tests

There are different endpoints for this API:
1. `/users/register`
* This endpoint accepts *POST* request.
* If user data is not on db it hashes the password, inserts the user data into db and returns a **token**.
* Body Params:
```
{
	"name": "deneme",
	"email": "deneme@gmail.com",
	"password": "deneme"
}
```

2. `/users/login`
* This endpoint accepts *POST* request.
* If user data is on db, it returns a **token**.
* Body Params:
```
{
	"email": "deneme@gmail.com",
	"password": "deneme"
}
```

3. `/users/info`
* This endpoint accepts *GET* request.
* This endpoint is for debug, checks the user info on the db.
* No body params, only `x-access-token` on header.


4. `/users/drop`
* This endpoint accepts *GET* request.
* This endpoint is for debug, clears `users` collection.
* No body params.

5. `/users/show`
* This endpoint accepts *GET* request.
* This endpoint is for debug, shows `users` collection.
* No body params

6. `/resource/insert`
* This endpoint accepts *POST* request.
* If the token is valid, it inserts the `number` parameter into user's `resource` data.
* Header: `x-access-token: {sample token}`
* Body Params:
```
{
	"number": 1
}
```

7. `/resource/show`
* This endpoint accepts *GET* request.
* This endpoint shows `resource` collection.
* No body params, only `x-access-token` on header.

1. `/resource/drop`
* This endpoint accepts *GET* request.
* This endpoint is for debug, clears `resource` collection.
* No params.


**Useful information about project:**
```
* API URL: https://zeplin-challenge.herokuapp.com/
* Web Server: Heroku
* Database: MongoDB Atlas
* App Framework: Node.js/Express.js
* CI/CD: Codeship
* Test framework: Mocha and Chai
```
