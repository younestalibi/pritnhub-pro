const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidation, loginValidation } = require('../validator/authValidator');

router.post('/register',registerValidation, AuthController.register);
router.post('/login',loginValidation, AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);
router.post('/logout', authMiddleware, AuthController.logout);
router.delete('/user/:id?', authMiddleware, AuthController.deleteUser);
router.put('/update',authMiddleware, AuthController.updateProfile);
router.put('/update/password',authMiddleware, AuthController.updatePassword);
router.get('/users',authMiddleware, AuthController.getAllUser);

module.exports = router;
