'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('chats', 'lastMessageId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'messages',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('chats', 'lastMessageId');
  },
};
