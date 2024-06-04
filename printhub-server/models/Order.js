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
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tracking_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
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
      Order.hasOne(models.Payment, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
    };
  
    return Order;
  };
  