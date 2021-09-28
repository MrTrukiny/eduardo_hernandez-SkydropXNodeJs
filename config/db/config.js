const config = require('../index');

const dbProfiles = {};

Object.keys(config).forEach((profile) => {
  dbProfiles[profile] = { ...config[profile].database };
});

module.exports = dbProfiles;
