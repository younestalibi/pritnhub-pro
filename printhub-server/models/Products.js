module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    catalog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Catalogs",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customization_options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Catalog, {
      foreignKey: "catalog_id",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
