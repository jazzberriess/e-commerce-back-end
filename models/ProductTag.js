const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns id, product id and tag id. Ensure that the product id is the foreign key to the id primary key in Product. Ensure that the tag is is the foreign key to the id primary key in Tag.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
