const { Order, OrderItem, Payment, sequelize } = require("../models");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    // const { totalAmount, items } = req.body;

    const totalAmount=1000;
    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Create an order
      const order = await Order.create(
        {
          user_id: userId,
          total_amount: totalAmount,
          status: "pending",
        },
        { transaction }
      );

      // Create order items
    //   await Promise.all(
    //     items.map(async (item) => {
    //       await OrderItem.create(
    //         {
    //           order_id: order.id,
    //           product_id: item.productId,
    //           quantity: item.quantity,
    //           customizations: item.customizations,
    //         },
    //         { transaction }
    //       );
    //     })
    //   );

    // const cartItem = await CartItem.findOne({
    //     where: { id: newCartItem.id },
    //     include: {
    //       model: Product,
    //     },
    //   });
  

      // Commit the transaction
      await transaction.commit();

      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await transaction.rollback();
      throw error; // Throw the error to the outer catch block
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Update order status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const { status } = req.body;

//     const order = await Order.findByPk(orderId);
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     await order.update({ status });

//     res.status(200).json({ message: "Order status updated successfully", order });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete an order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;

//     const order = await Order.findByPk(orderId);
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     await Order.destroy({ where: { id: orderId } });

//     res.status(200).json({ message: "Order deleted successfully", id: orderId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
