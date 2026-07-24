'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lastMessageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bookingId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'bookings', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint('chats', {
      fields: ['senderId', 'receiverId', 'bookingId'],
      type: 'unique',
      name: 'unique_user_bookings'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};
