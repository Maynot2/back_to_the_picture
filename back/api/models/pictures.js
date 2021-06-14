'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const pictures = sequelize.define("pictures",
  {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER
        //   },
          url: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          albumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'albums',
              key: 'id',
            }
          },
          // createdAt: {
          //   type: DataTypes.DATE,
          //   // field: 'created_at',
          //   defaultValue: new Date(),
          //   allowNull: false,
          // },
          // updatedAt: {
          //   type: DataTypes.DATE,
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
  }
  );
  pictures.associate = (models) => {
    pictures.belongsTo(models.albums, {
      foreignKey: 'albumId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
};
  return pictures;
};