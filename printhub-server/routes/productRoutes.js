const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');

// Product routes
router.post('/', authMiddleware, productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/update/:id', authMiddleware, productController.updateProduct);
router.delete('/delete/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
