// Controllers
const makePostUser = require('./post_user.controller');

// Use cases
const { createUser } = require('../use_cases');

const postUser = makePostUser({ createUser });

module.exports = { postUser };
