const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, cartController.index);
router.post('/', authMiddleware, cartController.addToCart);
router.put('/update/:id', authMiddleware, cartController.updateCartItem);
router.delete('/remove/:id', authMiddleware, cartController.removeFromCart);
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;
