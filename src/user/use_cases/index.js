// Use cases
const makeCreateUser = require('./create_user.usecase');
const makeUpdateUser = require('./update_user.usecase');
const makeRemoveUser = require('./remove_user.usecase');

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
const removeUser = makeRemoveUser({ eraseUser: userDAO.erase });

module.exports = { createUser, updateUser, removeUser };
