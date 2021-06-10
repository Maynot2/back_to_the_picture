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
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Paul',
          email: 'pol@test.com',
          password: '123',
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Mathieu',
          email: 'mat@test.com',
          password: '123',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Marc',
          email: 'marc@test.com',
          password: '123',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
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
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Nantes',
          latitude: 47.2089,
          longitude: -1.5647, 
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Bordeaux',
          latitude: 44.8402,
          longitude: -0.5775, 
          created_at: new Date(),
          updated_at: new Date(),
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
          user_id: 3,
          spot_id: 1,
          taken_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Nantes1',
          user_id: 4,
          spot_id: 2,
          taken_at: new Date(), 
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Bordeaux1',
          user_id: 3,
          spot_id: 3,
          taken_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'pictures',
      [
        {
          id: 1,
          album_id: 1,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mathieu-chirico-JSEn2f96rzY-unsplash.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          album_id: 2,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1097012310-612x612.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          album_id: 3,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/rich-smith-R1obAiNAD5Y-unsplash.jpg',
          created_at: new Date(),
          updated_at: new Date(),
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
