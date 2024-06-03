module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  
    OrderItem.associate = (models) => {
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });
    };
  
    return OrderItem;
  };
  