How to run 

Clone the repo 

Install postgres
on windows 
Go to file pg_hba.conf in C:\Program Files\PostgreSQL\16\data change method to md5
```
psql -U postgres
CREATE USER username WITH PASSWORD 'password';
CREATE DATABASE mydb;
GRANT ALL PRIVILEGES ON DATABASE mydb TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO my_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO my_user;
```

Once all this is done

Build
Install the dependencies.
```bash
$ npm install
Running the app

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
