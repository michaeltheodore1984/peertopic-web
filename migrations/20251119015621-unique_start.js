'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('bookings', 'unique_tutor_student');
    await queryInterface.addIndex('bookings', ['tutorId', 'studentId', 'start'], {
      unique: true,
      name: 'tutorid_studentid_start_unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('bookings', 'tutorid_studentid_start_unique');
    await queryInterface.addIndex('bookings', ['tutorId', 'studentId'], {
      unique: true,
      name: 'unique_tutor_student',
    });
  }
};
