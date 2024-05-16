const { check } = require('express-validator');
const {User} = require('../models'); 

const registerValidation = [
    check('name')
        .notEmpty().withMessage('Name is required'),
    check('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Email is already in use');
            }
            return true;
        }),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
    check('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('User not found');
            }
            return true;
        }),

    check('email')
        .isEmail().withMessage('Invalid email address')
        .notEmpty().withMessage('Email is required'),
    check('password')
        .notEmpty().withMessage('Password is required')
];

module.exports = {
    registerValidation,
    loginValidation
};
