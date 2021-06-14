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
          name: 'god',
          email: 'god@test.com',
          password: 'password',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'paul',
          email: 'pol@test.com',
          password: 'password',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'thibault',
          email: 'tibo@test.com',
          password: 'password',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'huy',
          email: 'huy@test.com',
          password: 'password',
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
          name: 'Bordeaux',
          latitude: 44.8402,
          longitude: -0.5775, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Nantes',
          latitude: 47.2089,
          longitude: -1.5647, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Le_Louvre',
          latitude: 48.8612,
          longitude: 2.3359, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Pont_Neuf',
          latitude: 48.856750,
          longitude: 2.341033, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'Les_Alpes',
          latitude: 45.9113,
          longitude: 6.8343, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          name: 'Palavas-les-Flots',
          latitude: 43.5339,
          longitude: 3.9289, 
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
          userId: 2,
          spotId: 1,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Lacanau2',
          userId: 2,
          spotId: 1,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Bordeaux1',
          userId: 2,
          spotId: 2,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Nantes1',
          userId: 3,
          spotId: 3,
          takenAt: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Le_Louvre1',
          userId: 4,
          spotId: 4,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'Pont_Neuf1',
          userId: 4,
          spotId: 5,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          name: 'Alpes1',
          userId: 2,
          spotId: 6,
          takenAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          name: 'PLF1',
          userId: 3,
          spotId: 7,
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
          albumId: 1,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mathieu-chirico-sFSZuKI2CvY-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          albumId: 1,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/philipp-kammerer-thFqCz8cXu0-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          albumId: 2,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/victoria-palacios-scIXeTCipZA-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          albumId: 2,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/linus-nylund-SfdwxMA5VIM-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          albumId: 2,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/ryan-loughlin-HXqpJnLyHzg-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          albumId: 2,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/jeremy-bishop-cmt3JdS5MC4-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          albumId: 2,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/jeremy-bishop-_CFv3bntQlQ-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          albumId: 3,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1095826194-612x612.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          albumId: 3,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/rich-smith-R1obAiNAD5Y-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          albumId: 3,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/ryan-ancill-usWBr_oZt4w-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          albumId: 4,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1097012310-612x612.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          albumId: 4,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1171570694-612x612.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          albumId: 4,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1187975468-612x612.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          albumId: 5,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/irina-lediaeva-nHuHQyY0aB4-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 16,
          albumId: 5,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/sebastian-yepes-TwOCH0u-NnI-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 17,
          albumId: 6,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/anthony-delanoix-pt4j4bGSPmw-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 18,
          albumId: 6,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/bruno-abatti-mEfIhOTH27w-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 19,
          albumId: 7,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/jorg-angeli-cCzeLwUCmnM-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 20,
          albumId: 7,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/markos-mant-F2gTQRAwQ3k-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 21,
          albumId: 7,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/visit-almaty-wN4D-mVR7fE-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 22,
          albumId: 8,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1178869864-612x612.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 23,
          albumId: 8,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-912925002-612x612.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 24,
          albumId: 8,
          url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mael-balland-1Uz89RFGMpY-unsplash.jpg',
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