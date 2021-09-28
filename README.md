# SkydropX Developer Challenges

### NodeJS Engineer Challenge

Welcome to my solution of this interesting challenge.
This is an APP that contains a RESTful API that allows you to realize CRUD operations with users.

**Example User**

```
company: 'Example Company 1',
email: 'examplemail1@mail.com',
first_name: 'Example User 1',
last_name: 'Example Resu 1',
url: 'http://exampleurl1.com',
text: 'Example Description 1'
```

## Documentation

You can see full documentation with cURL examples going to this link: [Postman Documentation](https://documenter.getpostman.com/view/7063210/UUxzAnUf).

## Deployment

You can explore a production ready deployment running on Heroku here: [SkydropxNodejs](https://skydropxnodejs.herokuapp.com/api/1.0/users).

### This back-end project was created with:

- Technologies:

  - Node.js 16.9.1 (and runs with any Node 16.x version).
  - Express (framework).
  - Joi (for data validation).
  - PostgreSQL (for storing data in staging and prod environments).
  - Sqlite (for storing data in dev and testing environments).
  - i18next (for internationalization).
  - Jest (for unit testing).

- Mode:

  - This project was created using a TDD approach. I just have to quick coding tests because of the time, but ALL the basic endpoints functionalities were tested before they were implemented.

- Project structure and design:

  - Clean architecture using _feature-oriented_ paradigm and _snake_case_ for directories and files naming.

**Highlighted-Note!**

I created a Cronjob that runs every 10 seconds (time could be change easily). It consist on a function that searchs for pending ids of users that previously was requested using the GET endpoint, but for any reason couldn't be created (Reqres fails, our DB fails or our SERVER fails). It will search a table called **pending_users** for any **pending_ids** to be created and then will search into _Reqres_ for user info to create it into our DB. It works wonderful!!

# How to run this project locally?

#### Step by step:

Pre-running instructions:

- Make sure to have **node** v16.x.x and **npm** v7.x.x installed.
- Make sure to have **\_sequelize-cli** installed: `npm install sequelize-cli -g`.
- Make sure to have PostgreSQL installed in your machine and have a **username**, **password** and two DB created: `skydropbx-prod` and `skydropx-stag`.

  - You can follow this guide if you're using Linux (Ubuntu/Debian): [Installing Postgres](https://www.digitalocean.com/community/tutorials/como-instalar-y-utilizar-postgresql-en-ubuntu-18-04-es).
  - You can follow this guide if you're using Mac: [Installing Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/).
  - You can follow this guide if your're using Windows: [Installing Postgres](https://www.postgresqltutorial.com/install-postgresql/).

- Make sure to have **pm2** installed in your machine: `npm install pm2 -g`.

Running instructions:

- Clone this repo and `cd` into it.
- Search a file called _.envexample_ and change its name for _.env_.
  - As you can see, there are already some values for test, dev, stage and prod environments.
  - Change this values: `POSTGRES_USERNAME_PROD, POSTGRES_PASSWORD_PROD, POSTGRES_USERNAME_STAG, POSTGRES_PASSWORD_STAG`. You must put your username and password used in your _Postgres_ configuration.
- Open a terminal in the current directory an run `npm install` command and wait till it finish to install all the dependencies.
- Run `npm start` and app will be running in _prod_ using **Postgres** and **pm2**. The APP is ready to be used.
- If for any reason you can start application with `npm start` just use `npm start:dev` for running app in _dev_ mode using sqlite.

Thank you for this opportunity.

### I hope you enjoy it!

## Best regards, MrTrukiny!
