// Controllers
const makePostUser = require('./post_user.controller');
const makePutUser = require('./put_user.controller');
const makeDeleteUser = require('./delete_user.controller');
const makeGetUsers = require('./get_users.controller');

// Use cases
const { createUser, updateUser, removeUser, readUsers } = require('../use_cases');

const postUser = makePostUser({ createUser });
const putUser = makePutUser({ updateUser });
const deleteUser = makeDeleteUser({ removeUser });
const getUsers = makeGetUsers({ readUsers });

module.exports = { postUser, putUser, deleteUser, getUsers };
