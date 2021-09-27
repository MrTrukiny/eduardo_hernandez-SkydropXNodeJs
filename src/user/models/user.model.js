const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('user', {
  company: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  first_name: {
    allowNull: false,
    trim: true,
    type: DataTypes.STRING,
    validate: {
      min: 2,
      max: 40,
    },
  },
  last_name: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = User;
