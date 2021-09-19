const Sequelize = require('sequelize');
const config = require('config');

const dbConfig = config.get('database');

const { database, dialect, logging, password, storage, username } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  storage,
  logging,
});

module.exports = sequelize;
