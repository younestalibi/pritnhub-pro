module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define("Catalog", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Catalog;
};
