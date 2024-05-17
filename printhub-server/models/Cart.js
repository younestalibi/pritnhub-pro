module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  
    Cart.associate = (models) => {
      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      Cart.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        onDelete: "CASCADE",
      });
    };
  
    return Cart;
  };
  