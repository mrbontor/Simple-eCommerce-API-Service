
# K-LINK Ecommerce Service

This is a simple e-commerce service, but its functionality is powerful.

### Requirements

- [Git](https://www.odoo.com/documentation/15.0/contributing/documentation.html#install-git)
- [Node JS >= v16.17^](https://nodejs.org/en/blog/release/v16.17.1/)
- [Node Alpine](https://github.com/nodejs/docker-node/blob/2a15356c778b366621aa370a4294c59ac1df9c6a/16/alpine3.17/Dockerfile)
- [npx >= 8](https://docs.npmjs.com/cli/v8/commands/npx?v=true)
- [ExpressJS](https://expressjs.com/en/4x/api.html)

- [MySQL 5.7](https://dev.mysql.com/doc/refman/5.7/en/)
- [Redis](https://redis.io/docs/)
- [JWT Token](https://jwt.io/introduction)
- [Sequelize](https://sequelize.org/docs/v6/)
- [Sequelize-CLI](https://github.com/sequelize/cli)
- [Ajv and AJv Plugins](https://ajv.js.org/guide/getting-started.html)
- [Uuid](https://github.com/uuidjs/uuid)
- [Docker and Docker Compose](https://docs.docker.com/get-docker/) (Optional)
- [Postman](https://learning.postman.com/docs/getting-started/introduction/)



### Project Structure

This Project use `modular system`, `Functional Programming (FP)` and `Object Oriented programming (OOP)`
The `OOP` only implemented to handle [Response Exeception](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), the rest in using `FP`

I also implements [SOLID Prinsiple](https://medium.com/mindorks/solid-principles-explained-with-examples-79d1ce114ace), but mostly using for
-`S (Single-Responsibilty)` _Good_,
-`O (Open-Closed)` _Good enough_,
-`D (Dependency Inversion)`  _Good enough_,
-`O (Liskov substitution)` _Not perfect yet_,

Below is Folder Structure that maybe would help you to undestand about this project.
and each `modules` have `responsibilty` base on `folder name`
```

.
├── `app`
│   ├── api
│   │   ├── v1
│   │   │   ├── auth
│   │   │   │   └── index.js
│   │   │   ├── cart
│   │   │   │   └── index.js
│   │   │   └── ..dst
│   │   │       └── ..index.js
│   │   └── index.js
│   ├── index.js
│   ├── helpers
│   │   ├── folder
│   │   └── file js
│   ├── libraries
│   │   └── folder name
│   │       └── index.js
│   └── modules
│       ├── controllers
│       │   └── sub-controllers
│       │       └── index.js
│       ├── models
│       │   └── sub-models
│       │       └── index.js
│       ├── repositoris
│       │   └── sub-repositoris
│       │       └── index.js
│       ├── schemas
│       │   └── sub-schemas
│       │       └── index.js
│       ├── services
│       │   └── sub-services
│       │       └── index.js
│       └── middleware
│           └── index.js
│               ├── midlerware A
│               └── midlerware B
├── index.sj
├── .sequelizerc
├── Dockerfile
├── docker-compose.yml
└── ..etc config files
```

### Settings & Configuring

#### App config

Before running application, please take a look the file `env.example` and change to `.env`

Noted: This project using [Docker](`./Dockerfile`) and [Docker Compose](`./docker-compose.yml`),
if you want to run without `Docker`, you have to change the _Configuration_ `[host](./.env-example)` for `mysql` and `redis`

```env
NODE_ENV             = development
APP_PORT            = 3000
APP_ISSUER          = gitbub.com/mrbontor
....
```

This Service is using `Json Web Token (JWT)` and `Cookie` to manage user session, please take a look for details in [AUTH API](#auth)


#### Mysql & Sequelize Config

- mysql   -> `./configs/mysql.js`
- sequelize   -> `./.sequelizerc`

#### Docker Volumes

- mysql   -> `./db/mysql_data`
- sequelize   -> `./db/redis_data`


#### Prettier Config

-> `./.prettierrc.json`


## Deployment && Testing

#### Deployment && Usage

By default, you can run this service following command below:

```sh
# cloning github
$ git clone https://github.com/mrbontor/Simple-eCommerce-API-Service.git

# enter to root dir
$ cd Simple-eCommerce-API-Service

# install dependencies
$ npm install

#if your system already have Redis and Mysql,
$ npx sequelize-cli db:migrate

#please check user seeder file, need a user with role Admin
$ npx sequelize db:seed:all

$ node app.js

###
# Run with Docker Compose
#
# dont need seeder
##

#create container network, please look in docker-compose.yml if you want to change it.
$ docker network create k-link-dev

# run app and start
$ docker-compose up --build -d
#or just
$ docker-compose up

# check healt app
$ curl http://localhost:3000
# {"uptime":48.741330481,"message":"OK","timestamp":1674976023067}%


# stop
$ docker-compose down

# remove volumes
$ docker-compose down --remove-orphans --volumes


# some usefull commands

# backup db
$ docker exec -it mysqldb /usr/bin/mysqldump -u root --password=LiveIn2023 ecommerce > backup.sql

#login to container
$ docker exec -it [`container-name`] sh

```

#### Running the test

As i mentioned before, the `Unit Test Code` not finish yet, but already finish with documentation in [/postman](https://github.com/mrbontor/Simple-eCommerce-API-Service/tree/main/postman)

Note : _I dont finish the Unit Test yet, but i have provided all the API serive including `test case` for every `endpoints and functionalities` [K-LINK-Ecommerce-Service](https://github.com/mrbontor/Simple-eCommerce-API-Service/blob/main/K-LINK-Ecommerce-Service.postman_collection.json)_


how to run:

```sh
# start
$ npm test
```

#### Running in Postman

Please follow this [Postman Doc Import Api](https://learning.postman.com/docs/designing-and-developing-your-api/importing-an-api/) for better information

The `Postman file` also included `documentation`, `environtment` and `Examples responses` for each cases
You just need to `import` the file.


## Endpoints

* [AUTH](#auth)
    1. [LOGIN](#1-login)
        * [Success](#i-example-request-success)
        * [Validation Error](#ii-example-request-validation-error)
        * [Wrong Username](#iii-example-request-wrong-username)
        * [Wrong Password](#iv-example-request-wrong-password)
        * [Account Deactivated](#v-example-request-account-deactivated)
    1. [SIGNUP](#2-signup)
        * [Success](#i-example-request-success-1)
        * [Username Exists](#ii-example-request-username-exists)
        * [Email Exists](#iii-example-request-email-exists)
        * [Validation Error](#iv-example-request-validation-error)
    1. [REFRESH](#3-refresh)
        * [Success](#i-example-request-success-2)
        * [Un Authorized](#ii-example-request-un-authorized)
    1. [LOGOUT](#4-logout)
        * [Success](#i-example-request-success-3)
        * [Un Authorized](#ii-example-request-un-authorized-1)
* [USER](#user)
    1. [CREATE](#1-create)
        * [Success](#i-example-request-success-4)
        * [Username Exists](#ii-example-request-username-exists-1)
        * [Email Exists](#iii-example-request-email-exists-1)
        * [Validation Error](#iv-example-request-validation-error-1)
        * [Access Forbidden](#v-example-request-access-forbidden)
    1. [UPDATE ROLE](#2-update-role)
        * [Success](#i-example-request-success-5)
        * [Validation Error](#ii-example-request-validation-error-1)
        * [Access Forbidden](#iii-example-request-access-forbidden)
    1. [UPDATE STATUS](#3-update-status)
        * [Success](#i-example-request-success-6)
        * [Validation Error](#ii-example-request-validation-error-2)
        * [Access Forbidden](#iii-example-request-access-forbidden-1)
    1. [UPDATE CREDENTIAL](#4-update-credential)
        * [Success](#i-example-request-success-7)
        * [Incorrect Password](#ii-example-request-incorrect-password)
        * [Un Authorized, password has changed](#iii-example-request-un-authorized-password-has-changed)
    1. [GET ALL](#5-get-all)
        * [Success](#i-example-request-success-8)
        * [Access Forbidden](#ii-example-request-access-forbidden)
    1. [GET ONE](#6-get-one)
        * [Success](#i-example-request-success-9)
        * [Access Forbidden](#ii-example-request-access-forbidden-1)
    1. [PROFILE](#7-profile)
        * [Success](#i-example-request-success-10)
        * [Wrong url](#ii-example-request-wrong-url)
    1. [PUT](#8-put)
    1. [DELETE](#9-delete)
        * [Success](#i-example-request-success-11)
        * [Not Found](#ii-example-request-not-found)
        * [Access Forbidden](#iii-example-request-access-forbidden-2)
        * [Special access](#iv-example-request-special-access)
* [PRODUCT](#product)
    1. [CREATE](#1-create-1)
        * [Success](#i-example-request-success-12)
        * [Validation Error, Missing field](#ii-example-request-validation-error-missing-field)
        * [Validation Error, additional Properties field](#iii-example-request-validation-error-additional-properties-field)
        * [Duplicate product](#iv-example-request-duplicate-product)
        * [Un Authorized](#v-example-request-un-authorized)
        * [Forbidden Access](#vi-example-request-forbidden-access)
    1. [UPDATE](#2-update)
        * [Success](#i-example-request-success-13)
        * [Not Found](#ii-example-request-not-found-1)
        * [Un Authorized](#iii-example-request-un-authorized)
        * [Forbidden Access](#iv-example-request-forbidden-access)
    1. [GET](#3-get)
        * [Success](#i-example-request-success-14)
        * [Un Authorized](#ii-example-request-un-authorized-2)
    1. [GET ONE](#4-get-one)
        * [Success](#i-example-request-success-15)
        * [Not Found](#ii-example-request-not-found-2)
        * [Un Authorized](#iii-example-request-un-authorized-1)
    1. [DELETE](#5-delete)
        * [Success](#i-example-request-success-16)
        * [Un Authorized](#ii-example-request-un-authorized-3)
        * [Forbidden Access](#iii-example-request-forbidden-access)
* [STOCK](#stock)
    1. [CREATE](#1-create-2)
        * [Success](#i-example-request-success-17)
        * [Validation Error](#ii-example-request-validation-error-3)
        * [Not Found](#iii-example-request-not-found)
        * [Un Authorized](#iv-example-request-un-authorized)
        * [Forbidden Access](#v-example-request-forbidden-access)
    1. [UPDATE](#2-update-1)
        * [Success](#i-example-request-success-18)
        * [Validation Error](#ii-example-request-validation-error-4)
        * [Not Found](#iii-example-request-not-found-1)
        * [Un Authorized](#iv-example-request-un-authorized-1)
        * [Forbidden Access](#v-example-request-forbidden-access-1)
    1. [GET](#3-get-1)
        * [Success](#i-example-request-success-19)
        * [Un Authorized](#ii-example-request-un-authorized-4)
    1. [GET ONE](#4-get-one-1)
        * [Success](#i-example-request-success-20)
        * [Un Authorized](#ii-example-request-un-authorized-5)
    1. [DELETE](#5-delete-1)
        * [Success](#i-example-request-success-21)
        * [Un Authorized](#ii-example-request-un-authorized-6)
        * [Forbidden Access](#iii-example-request-forbidden-access-1)
* [CART](#cart)
    1. [CREATE](#1-create-3)
        * [Success](#i-example-request-success-22)
        * [Insufficient Quantity](#ii-example-request-insufficient-quantity)
        * [Un Authorized](#iii-example-request-un-authorized-2)
    1. [GET](#2-get)
        * [Success](#i-example-request-success-23)
        * [No Data](#ii-example-request-no-data)
        * [Un Authorized](#iii-example-request-un-authorized-3)
    1. [DELETE](#3-delete)
        * [Success](#i-example-request-success-24)
        * [Un Authorized](#ii-example-request-un-authorized-7)
* [TRANSACTION](#transaction)
    1. [CHECKOUT](#1-checkout)
    1. [CHECKOUT](#2-checkout)
        * [Success](#i-example-request-success-25)
        * [No data Cart](#ii-example-request-no-data-cart)
        * [Un Authorized](#iii-example-request-un-authorized-4)
    1. [HISTORY TRANSACTION](#3-history-transaction)
        * [Success for Non Admin](#i-example-request-success-for-non-admin)
        * [Success for Admin](#ii-example-request-success-for-admin)
        * [Un Authorized Copy](#iii-example-request-un-authorized-copy)

--------



## AUTH

User(s) must be _authenticated_ before accessing any API.


The `AUTH API` will return `accessToken`, `refreshToken` and `DID`
`API` has provided `Cookies` for clients with `expiration time`.
To change the `lifetime`, look in the `.env` file. Expiration time is used to handle `JWT Token` and `Cookie` expiration

Notes:

- `accessToken` will be returned in response body
- `refreshToken` will be returned as `Cookie` with name `RTOKEN`
- `deviceId` is the _**device identifier**_ and will be returned as a `Cookie` with name `DID`



### 1. LOGIN


User login using method POST with paramaters`username` and `password.`


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/auth/login
```



***Body:***

```js
{
    "username": "superadmin",
    "password": "Haruslolos123!"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "username": "superadmin",
    "password": "Haruslolos123!"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkVXNlciI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlzQWN0aXZlIjp0cnVlLCJpc0FkbWluIjp0cnVlfSwiaWF0IjoxNjc0ODgwNDE0LCJleHAiOjE3MTA4ODQwMTQsImF1ZCI6ImtsaW5rLmNvLmlkIiwiaXNzIjoia2xpbmsuY28uaWQifQ.VcT-Te8oHqUXJj5HfwM1EDbPYTcbw-gEBCKwL2lq9Tk"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Validation Error



***Body:***

```js
{
    "username": "superadmin"
}
```



#### II. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "password",
            "key": "required",
            "message": "password is required"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Wrong Username



***Body:***

```js
{
    "username": "superadmins",
    "password": "Haruslolos123!"
}
```



#### III. Example Response: Wrong Username
```js
{
    "status": false,
    "message": "Un Authorized!"
}
```


***Status Code:*** 401

<br>



#### IV. Example Request: Wrong Password



***Body:***

```js
{
    "username": "superadmin",
    "password": "Haruslolos123!!"
}
```



#### IV. Example Response: Wrong Password
```js
{
    "status": false,
    "message": "Un Authorized!"
}
```


***Status Code:*** 401

<br>



#### V. Example Request: Account Deactivated



***Body:***

```js
{
    "username": "user",
    "password": "Haruslolos123!"
}
```



#### V. Example Response: Account Deactivated
```js
{
    "status": false,
    "message": "Your account has been deactive, please contact your administrator!"
}
```


***Status Code:*** 422

<br>



### 2. SIGNUP


Register user use `JSON` payload to create a user

fields:

- username, _`required`_
- email, _`required`_
- password, _`required`_


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/auth/register
```



***Body:***

```js
{
    "username": "usertest",
    "email": "usertest@gmail.com",
    "password": "Haruslolos123!"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "username": "user3",
    "email": "user3@gmail.com",
    "password": "Haruslolos123!"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "username": "user3",
        "email": "user3@gmail.com",
        "isActive": true,
        "isAdmin": false
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Username Exists



***Body:***

```js
{
    "username": "user2",
    "email": "user2@gmail.com",
    "password": "Haruslolos123!"
}
```



#### II. Example Response: Username Exists
```js
{
    "status": false,
    "message": "Username is already used!"
}
```


***Status Code:*** 422

<br>



#### III. Example Request: Email Exists



***Body:***

```js
{
    "username": "XXXXXXXXXXXXXXXXXXXX",
    "email": "user2@gmail.com",
    "password": "Haruslolos123!"
}
```



#### III. Example Response: Email Exists
```js
{
    "status": false,
    "message": "Email is already used!"
}
```


***Status Code:*** 422

<br>



#### IV. Example Request: Validation Error



***Body:***

```js
{
    "username": 1,
    "email": "user2@gmail.com",
    "password": "Haruslolos123!",
    "test": "additional"
}
```



#### IV. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "test",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        },
        {
            "param": "/username/undefined",
            "key": "type",
            "message": "must be string"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 3. REFRESH


Fetch new Token as a refresh token


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/auth/refresh-token
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkVXNlciI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlzQWN0aXZlIjp0cnVlLCJpc0FkbWluIjp0cnVlfSwiaWF0IjoxNjc0ODgwOTU3LCJleHAiOjE3MTA4ODQ1NTcsImF1ZCI6ImtsaW5rLmNvLmlkIiwiaXNzIjoia2xpbmsuY28uaWQifQ.II0mD_30MRG7Qp7MQ5UhtoI_JIco7dDsPTnzbXmldzQ"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Un Authorized



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 4. LOGOUT


User Logout and remove token, cookies etc


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/auth/logout
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| allDevices | true | true or false |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| allDevices | true | true or false |



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: Un Authorized



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| allDevices | true | true or false |



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



## USER

`Users` directory contains all the user related APIs. For authentication these apis requrie `AuthBearerToken`



### 1. CREATE


Create user use `JSON` payload to create a user

fields:

- username, _`required`_
- email, _`required`_
- password, _`required`_


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/users
```



***Body:***

```js
{
    "username": "superadmin",
    "email": "superadmin@gmail.com",
    "password": "Haruslolos123!"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "username": "user3",
    "email": "user3@gmail.com",
    "password": "Haruslolos123!"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "username": "user3",
        "email": "user3@gmail.com",
        "isActive": true,
        "isAdmin": false
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Username Exists



***Body:***

```js
{
    "username": "user2",
    "email": "user2@gmail.com",
    "password": "Haruslolos123!"
}
```



#### II. Example Response: Username Exists
```js
{
    "status": false,
    "message": "Username is already used!"
}
```


***Status Code:*** 422

<br>



#### III. Example Request: Email Exists



***Body:***

```js
{
    "username": "XXXXXXXXXXXXXXXXXXXX",
    "email": "user2@gmail.com",
    "password": "Haruslolos123!"
}
```



#### III. Example Response: Email Exists
```js
{
    "status": false,
    "message": "Email is already used!"
}
```


***Status Code:*** 422

<br>



#### IV. Example Request: Validation Error



***Body:***

```js
{
    "username": 1,
    "email": "user2@gmail.com",
    "password": "Haruslolos123!",
    "test": "additional"
}
```



#### IV. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "test",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        },
        {
            "param": "/username/undefined",
            "key": "type",
            "message": "must be string"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### V. Example Request: Access Forbidden



***Body:***

```js
{
    "username": "user2",
    "email": "user2@gmail.com",
    "password": "Haruslolos123!"
}
```



#### V. Example Response: Access Forbidden
```js
Forbidden
```


***Status Code:*** 403

<br>



### 2. UPDATE ROLE


Patch role user use `JSON` payload to update user role

fields:

- isAdmin, _`required`_


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{local}}/v1/users/role/1
```



***Body:***

```js
{
    "isAdmin": true
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "isAdmin": true
}
```



***Status Code:*** 204

<br>



#### II. Example Request: Validation Error



***Body:***

```js
{
    "isAdmin": "true"
}
```



#### II. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "isAdmin",
            "key": "type",
            "message": "isAdmin should be in boolean format"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Access Forbidden



***Body:***

```js
{
    "isAdmin": true
}
```



#### III. Example Response: Access Forbidden
```js
Forbidden
```


***Status Code:*** 403

<br>



### 3. UPDATE STATUS


Patch status user use `JSON` payload to update user status

fields:

- isActive, _`required`_


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{local}}/v1/users/status/1
```



***Body:***

```js
{
    "isActive": true
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "isActive": true
}
```



***Status Code:*** 204

<br>



#### II. Example Request: Validation Error



***Body:***

```js
{
    "isActive": true
}
```



#### II. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "isAdmin",
            "key": "type",
            "message": "isAdmin should be in boolean format"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Access Forbidden



***Body:***

```js
{
    "isActive": true
}
```



#### III. Example Response: Access Forbidden
```js
Forbidden
```


***Status Code:*** 403

<br>



### 4. UPDATE CREDENTIAL


`Patch` password user use `JSON` payload to update user password.

fields:

- password, _`required`_
- newPassword, _`required`_


Noted: Changing password will remove Token Bearer


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{local}}/v1/users/password
```



***Body:***

```js
{
    "password": "Haruslolos123!",
    "newPassword": "Haruslolos123!"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "password": "!Haruslolos123",
    "newPassword": "Haruslolos123!"
}
```



***Status Code:*** 204

<br>



#### II. Example Request: Incorrect Password



***Body:***

```js
{
    "password": "Haruslolos123!",
    "newPassword": "!Haruslolos123"
}
```



#### II. Example Response: Incorrect Password
```js
{
    "status": false,
    "message": "Incorect Password"
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Un Authorized, password has changed



***Body:***

```js
{
    "password": "!Haruslolos123",
    "newPassword": "Haruslolos123!"
}
```



#### III. Example Response: Un Authorized, password has changed
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 5. GET ALL


Fetch all users list


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/users
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": 1,
            "username": "superadmin",
            "email": "superadmin@gmail.com",
            "isActive": true,
            "isAdmin": true
        },
        {
            "id": 2,
            "username": "user",
            "email": "user@gmail.com",
            "isActive": true,
            "isAdmin": false
        },
        {
            "id": 3,
            "username": "user2",
            "email": "user2@gmail.com",
            "isActive": true,
            "isAdmin": false
        },
        {
            "id": 4,
            "username": "user3",
            "email": "user3@gmail.com",
            "isActive": true,
            "isAdmin": false
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Access Forbidden



***Body: None***



#### II. Example Response: Access Forbidden
```js
Forbidden
```


***Status Code:*** 403

<br>



### 6. GET ONE


Fetch a single user using `idUser`

Only Admin can perform this API


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/users/3
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "username": "user2",
        "email": "user2@gmail.com",
        "isActive": true,
        "isAdmin": false
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Access Forbidden



***Body: None***



#### II. Example Response: Access Forbidden
```js
Forbidden
```


***Status Code:*** 403

<br>



### 7. PROFILE


Fetch user's profile with current `session`


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/users/profiles
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "username": "superadmin",
        "email": "superadmin@gmail.com",
        "isActive": true,
        "isAdmin": true
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Wrong url



***Body: None***



#### II. Example Response: Wrong url
```js
{
    "status": false,
    "message": "User is not found!"
}
```


***Status Code:*** 404

<br>



### 8. PUT


Update user use `JSON` payload to update a user

Note: dont need update since there is only a few fields.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{local}}/v1/users/1
```



***Body:***

```js
{
    "username": "superadmin",
    "email": "superadmin@gmail.com"
}
```



### 9. DELETE


Delete a single user using `idUser`

Only Admin can perform this API


***Endpoint:***

```bash
Method: DELETE
Type:
URL: {{local}}/v1/users/3
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: Not Found



***Body: None***



#### II. Example Response: Not Found
```js
{
    "status": false,
    "message": "User not found!"
}
```


***Status Code:*** 404

<br>



#### III. Example Request: Access Forbidden



***Body: None***



#### III. Example Response: Access Forbidden
```js
Forbidden
```


***Status Code:*** 403

<br>



#### IV. Example Request: Special access



***Body: None***



#### IV. Example Response: Special access
```js
{
    "status": false,
    "message": "He is Zeus, you cant delete him!!!"
}
```


***Status Code:*** 422

<br>



## PRODUCT

To access the **PRODUCT API**, a `Bearer Token` is needed which can be obtained from the **AUTH API**

While creating _a Product_, it also will create data into Table `Stock` with _Quantity_ `0` _Price_ `0`

`User Admin` to update **Stock** for `Quantity` and `Price` first.



### 1. CREATE


Create product use `JSON` payload to create a product.

fields:

- name is `required`
- description is `optional`


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/products
```



***Body:***

```js
{
    "name": "product",
    "description": null
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "name": "product",
    "description": "product"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "id": 1,
        "name": "product",
        "description": "product",
        "status": true,
        "updatedAt": "2023-01-28T05:11:47.090Z",
        "createdAt": "2023-01-28T05:11:47.090Z"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Validation Error, Missing field



***Body:***

```js
{
    "description": "product"
}
```



#### II. Example Response: Validation Error, Missing field
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "name",
            "key": "required",
            "message": "Name is required!"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Validation Error, additional Properties field



***Body:***

```js
{
    "name": "product",
    "description": "product",
    "test": "asd"
}
```



#### III. Example Response: Validation Error, additional Properties field
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "",
            "key": "additionalProperties",
            "message": "Field(s) is not allowed"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### IV. Example Request: Duplicate product



***Body:***

```js
{
    "name": "product",
    "description": null
}
```



#### IV. Example Response: Duplicate product
```js
{
    "status": false,
    "message": "Product is already exist!"
}
```


***Status Code:*** 422

<br>



#### V. Example Request: Un Authorized



***Body:***

```js
{
    "name": "product",
    "description": "product"
}
```



#### V. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



#### VI. Example Request: Forbidden Access



***Body:***

```js
{
    "name": "product",
    "description": null
}
```



#### VI. Example Response: Forbidden Access
```js
Forbidden
```


***Status Code:*** 403

<br>



### 2. UPDATE


Update product use `JSON` payload to update a product.

fields:

- name is `required`
- description is `optional`


Noted: Only Admin can perform this API


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{local}}/v1/products/1
```



***Body:***

```js
{
    "name": "product",
    "description": "with description"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "name": "product",
    "description": "with description"
}
```



***Status Code:*** 204

<br>



#### II. Example Request: Not Found



***Body:***

```js
{
    "name": "product",
    "description": "with description"
}
```



#### II. Example Response: Not Found
```js
{
    "status": false,
    "message": "Product not found!"
}
```


***Status Code:*** 404

<br>



#### III. Example Request: Un Authorized



***Body:***

```js
{
    "name": "product",
    "description": "product"
}
```



#### III. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



#### IV. Example Request: Forbidden Access



***Body:***

```js
{
    "name": "product",
    "description": null
}
```



#### IV. Example Response: Forbidden Access
```js
Forbidden
```


***Status Code:*** 403

<br>



### 3. GET


Fetch all `Product` list


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/products
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": 1,
            "name": "product",
            "description": "product",
            "status": true,
            "createdAt": "2023-01-28T05:11:47.000Z",
            "updatedAt": "2023-01-28T05:11:47.000Z",
            "stock": {
                "price": 0,
                "idStock": 1,
                "quantity": 0
            }
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Un Authorized



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 4. GET ONE


Fetch a single product using `idProduct`


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/products/1111
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "id": 1,
        "name": "product",
        "description": "with description",
        "status": true,
        "createdAt": "2023-01-28T05:11:47.000Z",
        "updatedAt": "2023-01-28T07:14:10.000Z",
        "stock": {
            "price": 10000,
            "idStock": 1,
            "quantity": 12
        }
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Not Found



***Body: None***



#### II. Example Response: Not Found
```js
{
    "status": false,
    "message": "Product is not found!"
}
```


***Status Code:*** 404

<br>



#### III. Example Request: Un Authorized



***Body: None***



#### III. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 5. DELETE


Delete a single product using `idProduct`

_Noted: Deleting a_ _`product`_ _will delete_ _`stock`_ _as well and Only Admin can perform this API_


***Endpoint:***

```bash
Method: DELETE
Type:
URL: {{local}}/v1/products/2
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: Un Authorized



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



#### III. Example Request: Forbidden Access



***Body: None***



#### III. Example Response: Forbidden Access
```js
Forbidden
```


***Status Code:*** 403

<br>



## STOCK

To access the **STOCK API**, a `Bearer Token` is needed which can be obtained from the **AUTH API**

`STOCK API` is used to manage `Quantity` and `Price` of _Product_.

_Only user with role_ _`Admin`_ _can perform this_ _`API`_



### 1. CREATE


Create stoc use `JSON` payload to create a stock.

fields:

- idProduct is `required`
- quantity is `required`
- price is `required`


Noted: _this Api already performed in_ _`POST Product`__, but this can help_ _`user`_ _managing between_ _`Product`_ _and_ _`Stock`_


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/stocks
```



***Body:***

```js
{
    "idProduct": 1,
    "quantity": 10,
    "price": 10000
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "idProduct": 1,
    "quantity": 10,
    "price": 10000
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "price": 10000,
        "id": 3,
        "idProduct": 1,
        "quantity": 10,
        "updatedAt": "2023-01-28T07:47:07.924Z",
        "createdAt": "2023-01-28T07:47:07.924Z"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Validation Error



***Body:***

```js
{
    "idProduct": 1,
    "quantity": 10,
    "price": "10000",
    "test": "additional property"
}
```



#### II. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "test",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        },
        {
            "param": "price",
            "key": "type",
            "message": "Price must be number"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Not Found



***Body:***

```js
{
    "idProduct": 1111,
    "quantity": 10,
    "price": 10000
}
```



#### III. Example Response: Not Found
```js
{
    "status": false,
    "message": "Product is not found"
}
```


***Status Code:*** 404

<br>



#### IV. Example Request: Un Authorized



***Body: None***



#### IV. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



#### V. Example Request: Forbidden Access



***Body: None***



#### V. Example Response: Forbidden Access
```js
Forbidden
```


***Status Code:*** 403

<br>



### 2. UPDATE


Update stock product use `JSON` payload to update a stock product.

fields:

- quantity is `required`
- price is `required`
- idStock as params, `required`


Noted: Only Admin can perform this API


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{local}}/v1/stocks/7
```



***Body:***

```js
{
    "quantity": 12,
    "price": 10000
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "quantity": 12,
    "price": 10000
}
```



***Status Code:*** 204

<br>



#### II. Example Request: Validation Error



***Body:***

```js
{
    "idProduct": 1,
    "quantity": 10,
    "price": "10000",
    "test": "additional property"
}
```



#### II. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "idProduct",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        },
        {
            "param": "test",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        },
        {
            "param": "price",
            "key": "type",
            "message": "Price must be number"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Not Found



***Body:***

```js
{
    "quantity": 10,
    "price": 10000
}
```



#### III. Example Response: Not Found
```js
{
    "status": false,
    "message": "Product is not found"
}
```


***Status Code:*** 404

<br>



#### IV. Example Request: Un Authorized



***Body:***

```js
{
    "quantity": 10,
    "price": 10000
}
```



#### IV. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



#### V. Example Request: Forbidden Access



***Body: None***



#### V. Example Response: Forbidden Access
```js
Forbidden
```


***Status Code:*** 403

<br>



### 3. GET


Fetch all stocks list


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/stocks
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "price": 10000,
            "id": 1,
            "idProduct": 1,
            "quantity": 12,
            "createdAt": "2023-01-28T05:11:47.000Z",
            "updatedAt": "2023-01-28T07:51:05.000Z",
            "product": {
                "idProduct": 1,
                "name": "product",
                "status": true
            }
        },
        {
            "price": 10000,
            "id": 3,
            "idProduct": 1,
            "quantity": 10,
            "createdAt": "2023-01-28T07:47:07.000Z",
            "updatedAt": "2023-01-28T07:47:07.000Z",
            "product": {
                "idProduct": 1,
                "name": "product",
                "status": true
            }
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Un Authorized



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 4. GET ONE


Fetch a single stock of product using `idStock`


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/stocks/1
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "price": 10000,
        "id": 1,
        "idProduct": 1,
        "quantity": 12,
        "createdAt": "2023-01-28T05:11:47.000Z",
        "updatedAt": "2023-01-28T07:51:05.000Z",
        "product": {
            "idProduct": 1,
            "name": "product",
            "status": true
        }
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Un Authorized



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 5. DELETE


Delete a single stock using `idStock`

_Noted: Deleting a_ _`stock`_ _will delete_ _`product`_ _as well and Only Admin can perform this API_


***Endpoint:***

```bash
Method: DELETE
Type:
URL: {{local}}/v1/stocks/3
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: Un Authorized



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



#### III. Example Request: Forbidden Access



***Body: None***



#### III. Example Response: Forbidden Access
```js
Forbidden
```


***Status Code:*** 403

<br>



## CART

The `API` using `Redis Database` to store the `cart` items

This API is only available for `User Logged In` with `active` session

Even user has `logged out`, this used to keep the cart `exists`.



### 1. CREATE


Create/Add item cart use `JSON` payload to add item to cart.

fields:

- data is `required`
- data is `array`


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/carts
```



***Body:***

```js
{
    "data": [
        {
            "idProduct": 3,
            "quantity": 1
        },
        {
            "idProduct": 5,
            "quantity": 1
        }
    ]
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "data": [
        {
            "idProduct": 3,
            "quantity": 6
        },
        {
            "idProduct": 5,
            "quantity": 2
        }
    ]
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": true
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Insufficient Quantity



***Body:***

```js
{
    "data": [
        {
            "idProduct": 3,
            "quantity": 6
        },
        {
            "idProduct": 5,
            "quantity": 2
        }
    ]
}
```



#### II. Example Response: Insufficient Quantity
```js
{
    "status": false,
    "message": "Insuficient quantity of product2"
}
```


***Status Code:*** 422

<br>



#### III. Example Request: Un Authorized



***Body:***

```js
{
    "data": [
        {
            "idProduct": 3,
            "quantity": 6
        },
        {
            "idProduct": 5,
            "quantity": 2
        }
    ]
}
```



#### III. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 2. GET


Fetch all `cart` list of `actve` session


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/carts
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "details": [
            {
                "idProduct": 3,
                "quantity": 6,
                "status": true,
                "subTotal": 60000,
                "name": "product2",
                "originProduct": {
                    "price": 10000,
                    "idStock": 4,
                    "quantity": 12
                }
            },
            {
                "idProduct": 5,
                "quantity": 2,
                "status": true,
                "subTotal": 20000,
                "name": "product",
                "originProduct": {
                    "price": 10000,
                    "idStock": 7,
                    "quantity": 12
                }
            }
        ],
        "grandTotal": 80000
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: No Data



***Body: None***



#### II. Example Response: No Data
```js
{
    "status": false,
    "message": "The shoppping cart is empty, please select some items first!"
}
```


***Status Code:*** 404

<br>



#### III. Example Request: Un Authorized



***Body: None***



#### III. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 3. DELETE


Delete all cart list


***Endpoint:***

```bash
Method: DELETE
Type:
URL: {{local}}/v1/carts
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: Un Authorized



***Body: None***



#### II. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



## TRANSACTION

The `TRANSACTION API` is used to manage user transaction.



### 1. CHECKOUT



***Endpoint:***

```bash
Method:
Type:
URL:
```



### 2. CHECKOUT


**CHECKOUT API** is used to simulate Calculation from `CART API.`

we will used `Active Session` and `Cache` to create a transaction.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/transactions/checkout
```



***Body:***

```js
{
    "amountPaid": 200000
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js
{
    "amountPaid": 200000
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "details": [
            {
                "idProduct": 3,
                "quantity": 1,
                "status": true,
                "subTotal": 10000,
                "name": "product2",
                "originProduct": {
                    "idStock": 4,
                    "quantity": 11,
                    "price": "10000"
                }
            },
            {
                "idProduct": 5,
                "quantity": 1,
                "status": true,
                "subTotal": 10000,
                "name": "product",
                "originProduct": {
                    "idStock": 7,
                    "quantity": 11,
                    "price": "10000"
                }
            }
        ],
        "grandTotal": 20000,
        "amountPaid": 200000
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: No data Cart



***Body:***

```js
{
    "amountPaid": 200000
}
```



#### II. Example Response: No data Cart
```js
{
    "status": false,
    "message": "The shoppping cart is empty, please select some items first!"
}
```


***Status Code:*** 404

<br>



#### III. Example Request: Un Authorized



***Body: None***



#### III. Example Response: Un Authorized
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 3. HISTORY TRANSACTION


Fetch all `transaction` list

If `User` has _role_ `Admin`, it will show `all` history transactions and if `User` is not , it will only return `user's own` history transaction


***Endpoint:***

```bash
Method: GET
Type:
URL: {{local}}/v1/transactions/history
```



***More example Requests/Responses:***


#### I. Example Request: Success for Non Admin



***Body: None***



#### I. Example Response: Success for Non Admin
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "total": null,
            "amountPaid": 200000,
            "id": 29,
            "idUser": 6,
            "invoice": "e5ee47d7-653c-4ee5-8a09-9c1ba844f1d5",
            "details": [
                {
                    "name": "product2",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 3
                },
                {
                    "name": "product",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 5
                }
            ],
            "status": "done",
            "createdAt": "2023-01-29T02:04:36.000Z",
            "updatedAt": "2023-01-29T02:04:36.000Z"
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Success for Admin



***Body: None***



#### II. Example Response: Success for Admin
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "total": 20000,
            "amountPaid": 200000,
            "id": 24,
            "idUser": 2,
            "invoice": "984e4a16-4024-421c-a56a-d954f2be6447",
            "details": [
                {
                    "name": "product2",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 3
                },
                {
                    "name": "product",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 5
                }
            ],
            "status": "done",
            "createdAt": "2023-01-29T01:15:29.000Z",
            "updatedAt": "2023-01-29T01:15:29.000Z",
            "user": {
                "username": "user"
            }
        },
        {
            "total": 20000,
            "amountPaid": 200000,
            "id": 25,
            "idUser": 2,
            "invoice": "2db43379-bf3c-4755-8ffd-fb2620ae28d0",
            "details": [
                {
                    "name": "product2",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 3
                },
                {
                    "name": "product",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 5
                }
            ],
            "status": "done",
            "createdAt": "2023-01-29T01:17:54.000Z",
            "updatedAt": "2023-01-29T01:17:54.000Z",
            "user": {
                "username": "user"
            }
        },
        {
            "total": 20000,
            "amountPaid": 200000,
            "id": 29,
            "idUser": 6,
            "invoice": "e5ee47d7-653c-4ee5-8a09-9c1ba844f1d5",
            "details": [
                {
                    "name": "product2",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 3
                },
                {
                    "name": "product",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 5
                }
            ],
            "status": "done",
            "createdAt": "2023-01-29T02:04:36.000Z",
            "updatedAt": "2023-01-29T02:04:36.000Z",
            "user": {
                "username": "usertest"
            }
        },
        {
            "total": 20000,
            "amountPaid": 200000,
            "id": 30,
            "idUser": 6,
            "invoice": "6c65eb48-c082-4e87-b334-e4e2a5ad64c7",
            "details": [
                {
                    "name": "product2",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 3
                },
                {
                    "name": "product",
                    "status": true,
                    "quantity": 1,
                    "subTotal": 10000,
                    "idProduct": 5
                }
            ],
            "status": "done",
            "createdAt": "2023-01-29T02:09:55.000Z",
            "updatedAt": "2023-01-29T02:09:55.000Z",
            "user": {
                "username": "usertest"
            }
        }
    ]
}
```


***Status Code:*** 200

<br>



#### III. Example Request: Un Authorized Copy



***Body: None***



#### III. Example Response: Un Authorized Copy
```js
Unauthorized
```


***Status Code:*** 401

<br>


If you have any question, please contact me or send me email

> mrbontor@gmail.com


---
[Back to top](#k-link-ecommerce-service)
