const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, addressController.index);
// router.post('/', authMiddleware, addressController.addToCart);
// router.put('/update/:id', authMiddleware, addressController.updateCartItem);
// router.delete('/remove/:id', authMiddleware, addressController.removeFromCart);
// router.delete('/clear', authMiddleware, addressController.clearCart);

module.exports = router;
