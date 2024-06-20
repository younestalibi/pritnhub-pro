module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define("Catalog", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Catalog.associate = (models) => {
    Catalog.hasMany(models.Product, {
      foreignKey: "catalog_id",
      onDelete: "CASCADE",
    });
  };

  return Catalog;
};
