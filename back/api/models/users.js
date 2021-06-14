'use strict';
// const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   // field: 'created_at',
    //   allowNull: false,
    //   defaultValue: new Date(),
    //   // name: 'createdAt',
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   // name: 'updatedAt',
    //   // field: 'updated_at',
    //   defaultValue: new Date(),
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
  users.associate = (models) => {
    users.hasMany(models.albums, {
      foreignKey: 'userId'
    });
  };
  return users;
};