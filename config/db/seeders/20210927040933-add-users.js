'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        company: `Seed Company ${i}`,
        email: `seeduser${i}@mail.com`,
        first_name: `Seed User ${i}`,
        last_name: `Seed Resu ${i}`,
        url: `http://seedurl${i}.com`,
        text: `Seed Description ${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkdDelete('users', null, {});
  },
};
