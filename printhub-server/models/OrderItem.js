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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      image: { 
        type: DataTypes.JSON,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, 
      },
      customizations: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      product: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });
  
    OrderItem.associate = (models) => {
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
    //   OrderItem.belongsTo(models.Product, {
    //     foreignKey: "product_id",
    //     onDelete: "CASCADE",
    //   });
    };
  
    return OrderItem;
  };
  