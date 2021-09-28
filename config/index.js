require('dotenv').config();

const development = require('./development');
const staging = require('./staging');
const test = require('./test');
// const production = require('./production');

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  development,
  staging,
  test,
  // production,
};
