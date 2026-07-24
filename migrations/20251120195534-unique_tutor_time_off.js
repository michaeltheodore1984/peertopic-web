'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('tutor_time_off', ['tutorId', 'date'], {
      unique: true,
      name: 'unique_tutor_time_off',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('tutor_time_off', 'unique_tutor_time_off');
  }
};
