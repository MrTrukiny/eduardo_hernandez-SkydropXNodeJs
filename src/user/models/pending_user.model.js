const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PendingUser = sequelize.define(
  'pending_user',
  {
    pending_ids: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = PendingUser;
