// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category. Setting to null as industry standard is typically set null rather than cascade
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

// Categories have many Products. Setting to null as industry standard is typically set null rather than cascade
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

// Products belongToMany Tags (through ProductTag). Explicitly naming foreign key to avoid duplication of column when making sql query through sequelize
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });

// Tags belongToMany Products (through ProductTag). Explicitly naming foreign key to avoid duplication of column when making sql query through sequelize
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
