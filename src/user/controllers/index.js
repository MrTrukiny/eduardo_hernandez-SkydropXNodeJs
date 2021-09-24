// Controllers
const makePostUser = require('./post_user.controller');
const makePutUser = require('./put_user.controller');
const makeDeleteUser = require('./delete_user.controller');

// Use cases
const { createUser, updateUser, removeUser } = require('../use_cases');

const postUser = makePostUser({ createUser });
const putUser = makePutUser({ updateUser });
const deleteUser = makeDeleteUser({ removeUser });

module.exports = { postUser, putUser, deleteUser };
