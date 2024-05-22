const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');
const authMiddleware = require('../middlewares/authMiddleware');

//Article routes
router.get('/', ArticleController.index);
router.post('/', authMiddleware, ArticleController.createArticle);
router.put('/update/:id', authMiddleware, ArticleController.updateArticle);
router.get('/:id', ArticleController.getArticleById);
router.delete('/delete/:id', authMiddleware, ArticleController.deleteArticle);

module.exports = router;
