'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename tutorId → senderId
    await queryInterface.renameColumn('chats', 'tutorId', 'senderId');

    // Rename learnerId → receiverId
    await queryInterface.renameColumn('chats', 'learnerId', 'receiverId');
  },

  async down(queryInterface, Sequelize) {
    // Revert names back if needed
    await queryInterface.renameColumn('chats', 'senderId', 'tutorId');
    await queryInterface.renameColumn('chats', 'receiverId', 'learnerId');
  }
};
