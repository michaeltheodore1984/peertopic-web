'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tutors', 'lessonsLeft');
    await queryInterface.removeColumn('tutors', 'earnings');
    await queryInterface.addColumn('tutors', 'bio', {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('tutors', 'lessonsLeft', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('tutors', 'earnings', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.removeColumn('tutors', 'bio')
  }
};
