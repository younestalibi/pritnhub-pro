const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');


//Article routes
router.get('/', ArticleController.index);
router.post('/', ArticleController.createArticle);
router.put('/update/:id', ArticleController.updateArticle);
router.get('/:id', ArticleController.getArticleById);
router.delete('/delete/:id',ArticleController.deleteArticle);

module.exports = router;
