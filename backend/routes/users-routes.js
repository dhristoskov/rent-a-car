const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const router = express.Router();

router.post('/register',
    [
        check('name', 'Please provide a name').not().isEmpty().isLength({ min: 4 }).trim(),
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail(),
        check('password', 'Password at least 6 character long').isLength({ min: 6 }).trim()
    ],
    usersController.registerUser
);

router.post('/login',
    [
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail(),
        check('password', 'Password at least 6 character long').isLength({ min: 6 }).trim()
    ],
    usersController.loginUser
);

router.post('/update',
    [
        check('password', 'Password at least 6 character long').isLength({ min: 6 }).trim()
    ], 
    usersController.updateUserPassword
);

module.exports = router;