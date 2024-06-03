module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Payment.associate = (models) => {
      Payment.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
    };
  
    return Payment;
  };
  