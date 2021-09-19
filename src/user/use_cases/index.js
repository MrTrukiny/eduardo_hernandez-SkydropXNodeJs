// Use cases
const makeCreateUser = require('./create_user.usecase');

// Entities
const buildUser = require('../entities');

// DAOs
const { userDAO } = require('../data_access');

const createUser = makeCreateUser({ buildUser, saveUser: userDAO.save });

module.exports = { createUser };
