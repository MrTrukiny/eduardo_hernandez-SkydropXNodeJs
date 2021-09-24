// Entities
const makeBuildUser = require('./user.entity');

// Validators
const userSchema = require('../user.schema');

const buildUser = makeBuildUser({ userSchema });

module.exports = buildUser;
