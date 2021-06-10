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
          album_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'albums',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          createdAt: {
            type: DataTypes.DATE,
            // field: 'created_at',
            defaultValue: new Date(),
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            // field: 'updated_at',
            defaultValue: new Date(),
            allowNull: false,
          }
  }, 
  {
    freezeTableName: true,
    // underscored: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  }
  );
  pictures.associate = (models) => {
    pictures.belongsTo(models.albums);
};
  return pictures;
};