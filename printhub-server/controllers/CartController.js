const { Cart, CartItem, Product } = require("../models");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

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
exports.addToCart = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      const userId = req.userId;
      const { productId, quantity, customizations } = req.body;
      console.log("==========================");
      console.log(req.body);
      console.log("==========================");
      // return res.json({data:req.body})
      const [cart, created] = await Cart.findOrCreate({
        where: { user_id: userId },
      });

      if (cart.locked) {
        return res.status(400).json({
          error:
            "Your Cart is locked, you can't add any product. Please contact support!",
        });
      }
      let imagesPath = [];
      if (req.files) {
        req.files.forEach((image) => {
          if (image.path) {
            imagesPath.push(image.path);
          }
        });
      }
      const newCartItem = await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        quantity,
        customizations: JSON.parse(customizations),
        image: imagesPath,
      });
      const cartItem = await CartItem.findOne({
        where: { id: newCartItem.id },
        include: {
          model: Product,
        },
      });
      res.status(201).json({
        message: "Item added to cart successfully",
        cart,
        cartItem,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// // Update quantity or customizations of an item in the cart
// exports.updateCartItem = async (req, res) => {
//   const cartItemId = req.params.id;
//   try {
//     const { quantity, customizations } = req.body;

//     const cartItem = await CartItem.findByPk(cartItemId);
//     if (!cartItem) {
//       return res.status(404).json({ error: "CartItem not found" });
//     }

//     cartItem.quantity = quantity;
//     cartItem.customizations = customizations;
//     await cartItem.save();

//     res
//       .status(200)
//       .json({ message: "CartItem updated successfully", cartItem });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

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

exports.lockCart = async (userId) => {
  const cart = await Cart.findOne({ where: { user_id: userId } });
  if (cart) {
    cart.locked = true;
    await cart.save();
  } else {
    throw new Error("Cart not found");
  }
};
exports.unLockCart = async (userId) => {
  const cart = await Cart.findOne({ where: { user_id: userId } });
  if (cart) {
    cart.locked = false;
    await cart.save();
  } else {
    throw new Error("Cart not found");
  }
};
