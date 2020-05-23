const express = require('express');
const { check } = require('express-validator');

const emailController = require('../controllers/email-controllers');
const router = express.Router();

//Send Invoice and checkout
router.post('/send/:id', emailController.sendInvoiceEmail);
//Send reset password link by mail
router.post('/reset',
    [
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail()
    ], 
    emailController.resetPassword
);

module.exports = router;