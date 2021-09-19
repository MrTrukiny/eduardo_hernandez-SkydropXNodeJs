// DAOs
const makeUserDAO = require('./user.dao');

// Models
const User = require('../user.model');

const userDAO = makeUserDAO({ User });

module.exports = { userDAO };
