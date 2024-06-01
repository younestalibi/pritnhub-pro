const { check } = require('express-validator');

//validation
const contactValidation = [
  check('name')
    .notEmpty().withMessage('Name is required 1'),
  check('email')
    .isEmail().withMessage('Invalid email address 1'),
  check('message')
    .notEmpty().withMessage('Message is required 1')
];

module.exports = contactValidation;