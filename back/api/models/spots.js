'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const spots = sequelize.define("spots",
  {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: DataTypes.INTEGER
      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
    // timestamps: true
  }
  );
  spots.associate = (models) => {
    spots.hasMany(models.albums);
  };
  return spots;
};