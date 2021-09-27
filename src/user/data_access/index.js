// DAOs
const makeUserDAO = require('./user.dao');
const makePendingUserDAO = require('./pending_user.dao');

// Models
const User = require('../models/user.model');
const PendingUser = require('../models/pending_user.model');

// Utils
const setPagination = require('../../shared/utils/pagination');

const userDAO = makeUserDAO({ User, setPagination });
const pendingUserDAO = makePendingUserDAO({ PendingUser });

module.exports = { userDAO, pendingUserDAO };
