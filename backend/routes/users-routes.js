const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const router = express.Router();

//Register new user
router.post('/register',
    [
        check('name', 'Please provide a name').not().isEmpty().isLength({ min: 4 }).trim(),
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail(),
        check('password', 'Password must be at least 6 character long').isLength({ min: 6 }).trim()
    ],
    usersController.registerUser
);

//Login user
router.post('/login',
    [
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail(),
        check('password', 'Password must be at least 6 character long').isLength({ min: 6 }).trim()
    ],
    usersController.loginUser
);

//Change user's password
router.post('/update',
    [
        check('password', 'Password must be at least 6 character long').isLength({ min: 6 }).trim()
    ], 
    usersController.updateUserPassword
);

module.exports = router;