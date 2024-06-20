module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("CartItem", {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      image: { 
        type: DataTypes.JSON,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      customizations: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });
  
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        onDelete: "CASCADE",
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE", 
      });
    };
  
    return CartItem;
  };
  