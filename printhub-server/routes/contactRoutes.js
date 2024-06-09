const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');

//contact routes
router.post('/', ContactController.createContact);
router.get('/', ContactController.index);
router.get('/:id', ContactController.getContactById);
router.post('/:id', ContactController.respondContact);
router.delete('/delete/:id', ContactController.deleteContact);

module.exports = router; 