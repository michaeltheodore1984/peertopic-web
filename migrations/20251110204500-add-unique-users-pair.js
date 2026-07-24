'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('chats', ['tutorId', 'learnerId'], {
      unique: true,
      name: 'unique_users_pair'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('chats', 'unique_users_pair');
  }
};
