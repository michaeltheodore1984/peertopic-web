'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the redundant columns
    await queryInterface.removeColumn('messages', 'chat_id');
    await queryInterface.removeColumn('messages', 'sender_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Restore the columns in case you need to roll back
    await queryInterface.addColumn('messages', 'chat_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('messages', 'sender_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
