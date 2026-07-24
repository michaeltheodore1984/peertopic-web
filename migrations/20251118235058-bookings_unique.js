'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex(
      'bookings',                // your table name
      ['tutorId', 'studentId'], // columns in the index
      {
        unique: true,
        name: 'unique_tutor_student' // index name
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('bookings', 'unique_tutor_student');
  }
};
