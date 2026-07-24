'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('bookings', 'start', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('bookings', 'end', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('bookings', 'start', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
    await queryInterface.changeColumn('bookings', 'end', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  }
};
