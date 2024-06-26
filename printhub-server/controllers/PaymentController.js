const paypal = require("@paypal/checkout-server-sdk");

const {
  calculateTotal,
  calculateItemTotal,
  calculateAdjustedPrice,
} = require("../services/CalculationService");
const uuid = require("uuid");
const {
  Cart,
  CartItem,
  Product,
  Order,
  sequelize,
  OrderItem,
} = require("../models");
const { updateProductQuantity } = require("./ProductController");
const { lockCart, unLockCart } = require("./CartController");

//==================Paypal payment==================
const Environment =
  process.env.PAYPAL_MODE === "sandbox"
    ? paypal.core.SandboxEnvironment
    : paypal.core.LiveEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

exports.getConfigPaypal = (req, res) => {
  res.json({
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
  });
};

exports.createOrderPaypal = async (req, res) => {
  const { shippingAddress } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  const userId = req.userId;
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: {
        model: CartItem,
        include: {
          model: Product,
        },
      },
    });

    if (cart) {
      // await lockCart(userId);
      const total = calculateTotal(cart.CartItems);
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: total.toFixed(2),
                },
              },
            },
            items: cart.CartItems.map((item) => {
              return {
                name: item.Product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: calculateAdjustedPrice(item).toFixed(2),
                },
                quantity: item.quantity,
                category: "PHYSICAL_GOODS",
              };
            }),
          },
        ],
      });
    } else {
      res.status(404).json({ error: "Cart items not found!" });
    }

    const order = await paypalClient.execute(request);
    if (order.result.status === "CREATED") {
      const trackingId = uuid.v4();
      const transaction = await sequelize.transaction();
      try {
        const createdOrder = await Order.create(
          {
            user_id: userId,
            tracking_id: trackingId,
            order_payment_id: order.result.id,
            payment_method: "paypal",
            address: shippingAddress,
          },
          { transaction }
        );
        await Promise.all(
          cart.CartItems.map(async (item) => {
            await OrderItem.create(
              {
                order_id: createdOrder.id,
                product: item.Product,
                quantity: item.quantity,
                image: item.image,
                customizations: item.customizations,
                price: calculateItemTotal(item),
              },
              { transaction }
            );
          })
        );

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }
    res.json({ id: order.result.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

exports.confirmOrderPaypal = async (req, res) => {
  const { orderId } = req.body;
  const userId = req.userId;

  try {
    const order = await Order.findOne({
      where: { order_payment_id: orderId, user_id: userId },
      include: {
        model: OrderItem,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }

    const request = new paypal.orders.OrdersGetRequest(orderId);
    const paypalOrder = await paypalClient.execute(request);

    if (paypalOrder.result.status === "COMPLETED") {
      const transaction = await sequelize.transaction();
      try {
        await order.update({ status: "completed" }, { transaction });
        const cart = await Cart.findOne({
          where: { user_id: userId },
          include: {
            model: CartItem,
            include: {
              model: Product,
            },
          },
        });

        await Promise.all(
          order.OrderItems?.map(async (item) => {
            await updateProductQuantity(
              item.product.id,
              item.quantity,
              transaction
            );
          })
        );

        // if (cart) {
        // await Promise.all(
        //   cart.CartItems.map(async (item) => {
        //     await updateProductQuantity(
        //       item.Product.id,
        //       item.quantity,
        //       transaction
        //     );
        await CartItem.destroy(
          {
            where: {
              cart_id: cart.id,
            },
          },
          { transaction }
        );
        //   })
        // );
        // await unLockCart(userId);
        // }
        await transaction.commit();

        res.json({
          message: "Order updated and cart items deleted successfully",
        });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } else {
      res.status(400).json({ error: "Payment not completed" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

exports.cancleOrderPaypal = async (req, res) => {
  const { orderId } = req.body;
  const userId = req.userId;
  try {
    const order = await Order.findOne({
      where: { order_payment_id: orderId, user_id: userId },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }
    const transaction = await sequelize.transaction();
    try {
      await order.update({ status: "cancelled" }, { transaction });
      // await unLockCart(userId);
      await transaction.commit();
      res.json({
        message: "Order cancelled successfully",
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
//==================Paypal payment==================

//==================Cih payment==================
exports.confirmOrderCih = async (req, res) => {
  const { shippingAddress, referenceId } = req.body;
  const userId = req.userId;
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: {
        model: CartItem,
        include: {
          model: Product,
        },
      },
    });

    if (!cart) {
      res.status(404).json({ error: "Cart items not found!" });
    }

    const trackingId = uuid.v4();
    const transaction = await sequelize.transaction();
    try {
      const createdOrder = await Order.create(
        {
          user_id: userId,
          tracking_id: trackingId,
          order_payment_id: referenceId,
          payment_method: "bank transfer",
          address: shippingAddress,
        },
        { transaction }
      );
      await Promise.all(
        cart.CartItems.map(async (item) => {
          await OrderItem.create(
            {
              order_id: createdOrder.id,
              product: item.Product,
              quantity: item.quantity,
              image: item.image,
              customizations: item.customizations,
              price: calculateItemTotal(item),
            },
            { transaction }
          );
          await item.destroy({ transaction });
        })
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    res.json({ message: "Order was created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
//==================Cih payment==================
