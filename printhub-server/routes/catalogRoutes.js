const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/CatalogController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, catalogController.createCatalog);
router.get('/:id', catalogController.getCatalogById);
router.put('/update/:id', authMiddleware, catalogController.updateCatalog);
router.delete('/delete/:id', authMiddleware, catalogController.deleteCatalog);

module.exports = router;
