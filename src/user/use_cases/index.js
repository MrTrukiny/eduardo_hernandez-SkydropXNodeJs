// Use cases
const makeCreateUser = require('./create_user.usecase');
const makeUpdateUser = require('./update_user.usecase');

// Entities
const buildUser = require('../entities');

// DAOs
const { userDAO } = require('../data_access');

const createUser = makeCreateUser({ buildUser, saveUser: userDAO.save });
const updateUser = makeUpdateUser({
  buildUser,
  editUser: userDAO.update,
  findUserById: userDAO.findById,
});

module.exports = { createUser, updateUser };
