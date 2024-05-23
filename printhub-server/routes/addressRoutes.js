const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, addressController.index);
router.post('/', authMiddleware, addressController.createAddress);
router.delete('/delete/:id', authMiddleware, addressController.deleteAddress);
// router.put('/update/:id', authMiddleware, addressController.updateCartItem);
// router.delete('/clear', authMiddleware, addressController.clearCart);

module.exports = router;
