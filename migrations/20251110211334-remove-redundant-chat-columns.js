'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the redundant columns
    await queryInterface.removeColumn('chats', 'tutor_id');
    await queryInterface.removeColumn('chats', 'learner_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Restore the columns in case you need to roll back
    await queryInterface.addColumn('chats', 'tutor_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('chats', 'learner_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
