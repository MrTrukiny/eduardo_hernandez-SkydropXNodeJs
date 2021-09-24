// Controllers
const makePostUser = require('./post_user.controller');
const makePutUser = require('./put_user.controller');

// Use cases
const { createUser, updateUser } = require('../use_cases');

const postUser = makePostUser({ createUser });
const putUser = makePutUser({ updateUser });

module.exports = { postUser, putUser };
