'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ProfileImages', 'fileKey', {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true,
      after: 'url',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ProfileImages', 'fileKey');
  }
};
