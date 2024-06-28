module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      tracking_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled","done"),
        allowNull: false,
        defaultValue: "pending",
      },
    }); 
  
    Order.associate = (models) => {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
     
    };
  
    return Order;
  };
  