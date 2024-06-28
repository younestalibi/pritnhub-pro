const {
  Order,
  OrderItem,
  User,
  Cart,
  CartItem,
  Product,
  sequelize,
} = require("../models");
const uuid = require("uuid");
const {
  calculateItemTotal,
  calculateTotalPrice,
} = require("../services/CalculationService");
const { updateProductQuantity } = require("./ProductController");
const Mail = require("../services/EmailService");

// Get all orders
exports.index = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderItem,
      },
      order: [["id", "DESC"]],
    });

    if (orders) {
      return res
        .status(200)
        .json({ orders, message: "Returned order Successfully!" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const trackingId = uuid.v4();
    const transaction = await sequelize.transaction();
    try {
      // Create an order
      const order = await Order.create(
        {
          user_id: userId,
          tracking_id: trackingId,
          status: "pending",
        },
        { transaction }
      );
      const cart = await Cart.findOne(
        {
          where: { user_id: userId },
          include: {
            model: CartItem,
            include: {
              model: Product,
            },
          },
        },
        { transaction }
      );
      if (cart.CartItems) {
        await Promise.all(
          cart.CartItems.map(async (item) => {
            await OrderItem.create(
              {
                order_id: order.id,
                product_id: item.Product.id,
                name: item.Product.name,
                image: item.Product.image,
                quantity: item.quantity,
                customizations: item.customizations,
                price: calculateItemTotal(item),
              },
              { transaction }
            );
          })
        );
      }

      await transaction.commit();

      res.status(201).json({
        message: "Order created successfully",
        order,
        cart,
        cartItems: cart.CartItems,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const { status } = req.body;
    const transaction = await sequelize.transaction();

    const order = await Order.findOne({
      where: { id: orderId },
      include: {
        model: OrderItem,
      },
    });
    const user = await User.findOne({
      where: { id: order.user_id },
    });
    const validTransitions = {
      pending: ["completed", "cancelled", "done"],
      completed: ["done"],
      cancelled: [],
      done: [],
    };

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({
        error: `Invalid status transition from ${order.status} to ${status}`,
      });
    }

    try {
      if (status == "completed") {
        await Promise.all(
          order.OrderItems?.map(async (item) => {
            await updateProductQuantity(
              item.product.id,
              item.quantity,
              transaction
            );
          })
        );
        await Mail.send(
          user?.email,
          `Your Order is created successfully!`,
          "orderSuccess.ejs",
          {
            totalAmount: calculateTotalPrice(order?.OrderItems),
            items: order?.OrderItems,
            orderDate: order.createdAt,
            orderNumber: order.order_payment_id,
            name: user.name,
          }
        );
      }
      if (status == "done") {
        await Mail.send(
          user?.email,
          `Your Order is delivered successfully!`,
          "orderDelivery.ejs",
          {
            totalAmount: calculateTotalPrice(order?.OrderItems),
            items: order?.OrderItems,
            orderDate: order.createdAt,
            orderNumber: order.order_payment_id,
            name: user.name,
          }
        );
      }
      await order.update({ status }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await Order.destroy({ where: { id: orderId } });

    res
      .status(200)
      .json({ message: "Order deleted successfully", id: orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View orders for the current user
exports.viewOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.findAll({
      where: { user_id: userId, status: ["pending", "completed", "done"] },
      include: {
        model: OrderItem,
      },
      order: [["createdAt", "DESC"]],
    });

    return res
      .status(200)
      .json({ orders, message: "Returned orders successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
