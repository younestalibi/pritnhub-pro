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
      locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
  