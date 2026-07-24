'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add composite unique index
    await queryInterface.addIndex('ProfileImages', ['userId', 'url'], {
      unique: true,
      name: 'profile_images_unique_userId_url' // custom index name
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the composite unique index
    await queryInterface.removeIndex('ProfileImages', 'profile_images_unique_userId_url');
  }
};
