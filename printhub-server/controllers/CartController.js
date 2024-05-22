const { Cart, CartItem, Product } = require("../models");

// Get all items in the user's cart
exports.index = async (req, res) => {
  try {
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
      return res
        .status(200)
        .json({ cart, message: "Returned Cart Successfully!" });
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity, customizations } = req.body;

    let [cart] = await Cart.findOrCreate({ where: { user_id: userId } });

    const newCartItem = await CartItem.create({
      cart_id: cart.id,
      product_id: productId,
      quantity,
      customizations,
    });

    const cartItem = await CartItem.findOne({
      where: { id: newCartItem.id },
      include: {
        model: Product,
      },
    });

    res
      .status(201)
      .json({ message: "Item added to cart successfully", cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity or customizations of an item in the cart
exports.updateCartItem = async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const { quantity, customizations } = req.body;

    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "CartItem not found" });
    }

    cartItem.quantity = quantity;
    cartItem.customizations = customizations;
    await cartItem.save();

    res
      .status(200)
      .json({ message: "CartItem updated successfully", cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "CartItem not found" });
    }

    await CartItem.destroy({ where: { id: cartItemId } });

    res
      .status(200)
      .json({ message: "CartItem removed successfully", id: cartItemId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear all items from the user's cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    await CartItem.destroy({ where: { cart_id: cart.id } });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
