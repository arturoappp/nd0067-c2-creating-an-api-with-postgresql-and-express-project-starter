# How to set up project 
# Scripts
Please execute scripts to install packages and setup docker images for database
- Install: ```npm install```
- Install: ```yarn```
- Set up docker images-database: ```docker-compose up -d```
- Run unit tests: ```npm run test```
- - Script will set up the db-migration data in test database
- Start server: ```npm run start```
- - Script will set up the db-migration data in dev database

# Import collection Postman
you can import postman collection to test the API:
-use file "nd0067-c2-creating-an-api-with-postgresql-and-express-project-starter" locate a root folder.

# EndPoint - host and port API

http://localhost:3000

example fetching all user:http://localhost:3000/users

# Env variables
Please create on root folder file ".env" with this information:
- ENV=dev
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=full_stack_dev
- POSTGRES_USER=full_stack_user
- POSTGRES_PASSWORD=password123
- POSTGRES_PORT=5432

#test
- POSTGRES_DB_TEST=full_stack_test
- POSTGRES_PORT_TEST=5433

#auth
- BCRYPT_PASS=pass_project_2
- SALT_NUM=10
- TOKEN_SECRET=token_project_2







# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!


### 7. Add a migration query
To create the sql files:
db-migrate create [Nam-of-sql-or-change] --sql-file

To fun the migration
db-migrate up

To roll back the migration
db-migrate down
