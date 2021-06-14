'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const albums = sequelize.define("albums",
  {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER
        //   },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            }
          },
          spotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'spots',
              key: 'id',
            }
          },
          takenAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          // createdAt: {
          //   type: DataTypes.DATE,
          //   defaultValue: new Date(),
          //   // field: 'created_at',
          //   allowNull: false,
          // },
          // updatedAt: {
          //   type: DataTypes.DATE,
          //   defaultValue: new Date(),
          //   // field: 'updated_at',
          //   allowNull: false,
          // }
  },
  {
    freezeTableName: true,
    // underscored: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  }
  );
  albums.associate = (models) => {
    albums.belongsTo(models.users, {
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    albums.belongsTo(models.spots, {
      foreignKey: 'spotId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    albums.hasMany(models.pictures, {
      foreignKey: 'albumId'
    });
};
  return albums;
};