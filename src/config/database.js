const Sequelize = require('sequelize');
const dbProfiles = require('../../config/db/config');
const { nodeEnv } = require('../../config');

const currentDbProfile = dbProfiles[nodeEnv];

const { database, dialect, logging, password, storage, username } = currentDbProfile;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  storage,
  logging,
});

module.exports = sequelize;
