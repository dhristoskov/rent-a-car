const express = require('express');
const { check } = require('express-validator');

const emailController = require('../controllers/email-controllers');
const router = express.Router();

router.post('/send/:id', emailController.sendInvoiceEmail);
router.post('/reset',
    [
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail()
    ], 
    emailController.resetPassword
);

module.exports = router;