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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, 
    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    quantity: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    image: { 
      type: DataTypes.JSON,
      allowNull: false,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
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
