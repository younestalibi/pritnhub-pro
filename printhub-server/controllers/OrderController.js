const {
  Order,
  OrderItem,
  Payment,
  Cart,
  CartItem,
  Product,
  sequelize,
} = require("../models");
const uuid = require("uuid");
const { calculateItemTotal } = require("../services/CalculationService");

// Get all orders
exports.index = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.findAll({
      //   where: { user_id: userId },
      include: {
        model: OrderItem
      },
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
    const totalAmount = 1000;
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
            // let product = await Product.findByPk(item.Product.id);
            // let newMaxValue = String(Number(product.quantity.max)-item.quantity);
            // let updatedQuantity = {
            //   ...product.quantity,
            //   max: newMaxValue,
            // };

            // // product.quantity=JSON.stringify({'test':'hi'})
            // // JSON.parse(product.quantity).max='someth'
            // console.log("--------");
            // // console.log(JSON.parse(product.quantity))
            // console.log(newMaxValue)
            // console.log(updatedQuantity)
            // // console.log(JSON.stringify(product.quantity))
            // // console.log(JSON.stringify(updatedQuantity));
            // console.log("--------");

            // product.quantity = JSON.stringify({name:"younes"})
            // await product.save();

            // await CartItem.destroy({ where: { id: item.id } }, { transaction });
          })
        );
      }

      // const cartItem = await CartItem.findOne({
      //     where: { id: newCartItem.id },
      //     include: {
      //       model: Product,
      //     },
      //   });

      // Commit the transaction
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
    const orderId = req.params.id;
    const { status } = req.body;
    const order = await Order.findOne({
      where: { id: orderId },
      include: {
        model: OrderItem,
        
      },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.update({ status });

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

    res.status(200).json({ message: "Order deleted successfully", id: orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
