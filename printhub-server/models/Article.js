module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Article.associate = (models) => {
    Article.hasMany(models.Product, {
      foreignKey: "article_id",
      onDelete: "CASCADE",
    });
  };

  return Article;
};
