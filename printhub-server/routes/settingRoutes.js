const express = require('express');
const router = express.Router();
const SettingController = require('../controllers/SettingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', SettingController.index);
router.post('/', authMiddleware, ArticleController.createArticle);
router.put('/update/:id', authMiddleware, SettingController.updateArticle);
router.get('/:id', ArticleController.getArticleById);
router.delete('/delete/:id', authMiddleware, ArticleController.deleteArticle);

module.exports = router;
