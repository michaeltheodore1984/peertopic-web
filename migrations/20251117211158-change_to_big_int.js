'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alter the start column to BIGINT
    await queryInterface.changeColumn('bookings', 'start', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });

    // Alter the end column to BIGINT
    await queryInterface.changeColumn('bookings', 'end', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback: change back to INTEGER (or whatever it was before)
    await queryInterface.changeColumn('bookings', 'start', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('bookings', 'end', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
