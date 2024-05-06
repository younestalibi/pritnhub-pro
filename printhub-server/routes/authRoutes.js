const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidation, loginValidation } = require('../validator/authValidator');

router.post('/register',registerValidation, AuthController.register);
router.post('/login',loginValidation, AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);
router.post('/logout', authMiddleware, AuthController.logout);
router.delete('/user', authMiddleware, AuthController.deleteUser);

module.exports = router;
