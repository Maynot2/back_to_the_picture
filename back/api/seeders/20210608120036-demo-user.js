'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Thibault',
          email: 'tibo@test.com',
          password: '123',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Paul',
          email: 'pol@test.com',
          password: '123',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Mathieu',
          email: 'mat@test.com',
          password: '123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Marc',
          email: 'marc@test.com',
          password: '123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'spots',
      [
        {
          id: 1,
          name: 'Lacanau',
          latitude: 45.0014,
          longitude: -1.2029, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Nantes',
          latitude: 47.2089,
          longitude: -1.5647, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Bordeaux',
          latitude: 44.8402,
          longitude: -0.5775, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'albums',
      [
        {
          id: 1,
          name: 'Lacanau1',
          userId: 3,
          spotId: 1,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Nantes1',
          userId: 4,
          spotId: 2,
          takenAt: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Bordeaux1',
          userId: 3,
          spotId: 3,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'pictures',
      [
        {
          id: 1,
          albumId: 1,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mathieu-chirico-JSEn2f96rzY-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          albumId: 2,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1097012310-612x612.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          albumId: 3,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/rich-smith-R1obAiNAD5Y-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, bulkDeleteOptions);
     await queryInterface.bulkDelete('spots', null, bulkDeleteOptions);
     await queryInterface.bulkDelete('albums', null, bulkDeleteOptions);
     await queryInterface.bulkDelete('pictures', null, bulkDeleteOptions);
  }
};