'use strict';
const envalid = require('envalid');

const config = envalid.cleanEnv(process.env, {
  DATABASE_HOST: envalid.str(),
  DATABASE_NAME: envalid.str(),
  DATABASE_PASSWORD: envalid.str(),
  DATABASE_PORT: envalid.port(),
  DATABASE_USER: envalid.str(),
  NODE_ENV: envalid.str({default: 'development'})
}, {
  strict: true
});

const sequelizeConfig = {
  [config.NODE_ENV]: {
    database: config.DATABASE_NAME,
    dialect: 'mysql',
    host: config.DATABASE_HOST,
    password: config.DATABASE_PASSWORD,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER
  }
};

module.exports = sequelizeConfig;
