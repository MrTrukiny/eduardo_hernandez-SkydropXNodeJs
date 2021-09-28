'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      first_name: {
        allowNull: false,
        trim: true,
        type: Sequelize.STRING,
        validate: {
          min: 2,
          max: 40,
        },
      },
      last_name: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
