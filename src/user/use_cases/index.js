// Use cases
const makeCreateUser = require('./create_user.usecase');
const makeUpdateUser = require('./update_user.usecase');
const makeRemoveUser = require('./remove_user.usecase');
const makeReadUsers = require('./read_users.usecase');

// Entities
const buildUser = require('../entities');

// DAOs
const { userDAO } = require('../data_access');

// Utils
const ErrorResponse = require('../../shared/utils/custom_error');

const createUser = makeCreateUser({ buildUser, saveUser: userDAO.save });
const updateUser = makeUpdateUser({
  buildUser,
  editUser: userDAO.update,
  findUserById: userDAO.findById,
  ErrorResponse,
});
const removeUser = makeRemoveUser({ eraseUser: userDAO.erase });
const readUsers = makeReadUsers({
  listUsers: userDAO.findAll,
  createUser,
});

module.exports = { createUser, updateUser, removeUser, readUsers };
