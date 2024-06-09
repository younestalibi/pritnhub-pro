const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Order routes
router.post('/', authMiddleware, orderController.createOrder);
router.get('/', orderController.index);
router.put('/update/:id', authMiddleware, orderController.updateOrderStatus);
router.delete('/delete/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;
