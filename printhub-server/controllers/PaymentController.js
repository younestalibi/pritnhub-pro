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

//Paypal
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
  console.log("-------------------");
  res.json({
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
  });
};

exports.createOrderPaypal = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  const userId = req.userId;
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

  try {
    // const getOrderRequest = new paypal.orders.OrdersGetRequest('8NM107911E702190J');
    // const getOrderResponse = await paypalClient.execute(getOrderRequest);
    // const fetchedOrder = getOrderResponse.result;
    // console.log(order.result.status === "CREATED");
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
          },
          { transaction }
        );

        await Promise.all(
          cart.CartItems.map(async (item) => {
            await OrderItem.create(
              {
                order_id: createdOrder.id,
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





exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.body;
  const userId = req.userId;

  // try { 
  //   const order = await Order.findOne({
  //     where: { order_payment_id: orderId, user_id: userId },
  //     include: {
  //       model: Product,
  //     },
  //   });

  //   if (!order) {
  //     return res.status(404).json({ error: "Order not found!" });
  //   }

  //   const request = new paypal.orders.OrdersGetRequest(orderId);
  //   const paypalOrder = await paypalClient.execute(request);
  //   if (paypalOrder.result.status === "COMPLETED") {
  //     const transaction = await sequelize.transaction();

  //     try {
  //       await order.update({ status: "completed" }, { transaction });

  //       const cart = await Cart.findOne({ where: { user_id: userId } });
  //       if (cart) {
  //         // await cart.destroy({ transaction });
  //         var cartItems = await CartItem.findAll({
  //           where: { cart_id: cart.id },
  //           include: {
  //             model: Product,
  //           },
  //         });
  //         // await CartItem.destroy({ where: { cart_id: cart.id } }, { transaction });
  //       }
  //       await transaction.commit();

  //       res.json({
  //         cartItems,
  //         message: "Order updated and cart items deleted successfully",
  //       });
  //     } catch (error) {
  //       await transaction.rollback();
  //       throw error;
  //     }
  //   } else {
  //     res.status(400).json({ error: "Payment not completed" });
  //   }
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).json({ error: e.message });
  // }
};
