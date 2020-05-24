const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');
require('dotenv').config();

//Register new user
const registerUser = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ msg: 'Invalid input, please check your data' })
    }

    const { name, email, password } = req.body

    let user;
    try {
        user = await User.findOne({ email });
    }catch(err){
        console.errors(err.message)
        res.status(500).send({ msg: 'Server Error' })
    }

    if(user){
        return res.status(422).json({ msg: 'User already exists, please login instead.' })
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }

    user = new User({
        name,
        email,
        password: hashedPassword,
        resetToken: '',
        expToken: '',
        orders: []
    });

    try{
        await user.save();
    }catch{
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
    
    let token;
    try{
        token = jwt.sign(
            {userId: user.id, name: user.name},
            process.env.JWT_SECRET, 
            {expiresIn: '1h'});
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    };

    res.status(201).json({userId: user.id, name: user.name, token: token});
};

//Login user
const loginUser = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ msg: 'Invalid input, please check your data' });
    }

    const { email, password } = req.body;

    let user;
    try {
        user = await User.findOne({ email });
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }

    if(!user){
        return res.status(403).json({ msg: 'Invalid credentials, could not log you in.'});
    }

    let isPasswordMatch = false;
    try{
        isPasswordMatch = await bcrypt.compare(password, user.password);
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
    if(!isPasswordMatch){
        return res.status(403).json({ msg: 'Invalid credentials, could not log you in.'});
    }

    let token;
    try{
        token = jwt.sign(
            {userId: user.id, name: user.name},
            process.env.JWT_SECRET, 
            {expiresIn: '1h'});
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    };

    res.json({userId: user.id, name: user.name, token: token});
};

//Update users password
const updateUserPassword = async ( req, res ) => {

    const { password, token } = req.body;

    let user;
    try{
        user = await User.findOne({resetToken: token, expToken: {$gt: Date.now()}})
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error, could not find the user' });
    }

    if(!user){
        return res.status(403).json({ msg: 'Could not find user, or the time is expired'});
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }

    try{
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expToken = undefined;
        await user.save();
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error, could not save new passowrd' });
    }
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.updateUserPassword = updateUserPassword;
