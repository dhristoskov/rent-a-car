const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');

const Order = require('../models/order');
const Car = require('../models/car');
const User = require('../models/user');

//Create new Order entry
const addOrder = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: 'Invalid inputs, please check your data.'});
    };

    const { firstName, lastName, startDate, endDate, car, customer } = req.body;

    let user;
    try{
        user = await User.findById(customer);
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }

    if(!user){
        return res.status(404).json({ msg: 'Could not find user for this id.' });
    }

    let searchedCar;
    try{
        searchedCar = await Car.findById(car);
    }catch(err){
        console.errors(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }

    if(!searchedCar){
        return res.status(404).json({ msg: 'Could not find car for this id.' });
    }

    //Calculate days and a total price for that order
    const days = Math.abs(endDate.getDate() - startDate.getDate());
    const price = (days * searchedCar.price);

    const order = new Order({
        firstName,
        lastName,
        startDate,
        endDate,
        totalDays: days,
        totalPrice: price,
        fixedPrice: price,
        name: searchedCar.name,
        model: searchedCar.model,
        image: searchedCar.image,
        isPayNow: false,
        car,
        customer
    });

    try{
        //Start Transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        await order.save({session: session});
        //Push order in Users orders array
        user.orders.push(order);
        await user.save({session: session});
        //Decrement avaliable cars by one
        const newCar = await Car.findByIdAndUpdate({_id:order.car}, {$inc: {qt: -1}}) 
        await newCar.save({session: session});
        await session.commitTransaction();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg:'Server Error, could not create that order'});
    }

    res.status(201).json({ order: order });
};

//Get all users order
const getUsersOrders = async ( req, res ) => {

    let orderByUser
    try{
        orderByUser = await User.findById(req.params.id).populate('orders');
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error, could not find orders for that user'});
    }

    if(!orderByUser|| orderByUser === 0){
        return res.status(404).json({msg: 'Could not find orders for this id.'});
    }

    res.json({ orders: orderByUser.orders.map(order => order.toObject({ getters: true })) });
};

const getOrderById = async ( req, res ) => {

    let orderById
    try{
        orderById = await Order.findById(req.params.id)
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error, could not find order for that id'});
    }

    if(!orderById){
        return res.status(404).json({ msg: 'Order not found' });
    };

    res.json({order: orderById.toObject({ getters: true}) });
};

//Delete order
const deleteOrder = async ( req, res ) => {

    let orederToDelete
    try {
        orederToDelete = await Order.findById(req.params.id).populate('customer').populate('car');
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error, could not delete order'});
    }

    if(!orederToDelete){
        return res.status(404).json({ msg: 'Could not find order for this id' });
    }

    try{
        //Start Transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        //Increment car qt field +1 when the car is back (order is deleted)
        const newCar = await Car.findByIdAndUpdate({_id: orederToDelete.car._id}, {$inc: {qt: 1}})
        await newCar.save({session: session});
        await orederToDelete.remove({session: session});
        orederToDelete.customer.orders.pull(orederToDelete);
        await orederToDelete.customer.save({session: session});
        await session.commitTransaction();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error, could not delete order'});
    };    

        res.status(200).json({msg: 'Order Deleted.'});
};

//Update single order price
const updatePayOption = async ( req, res ) => {

    const { isPayNow } = req.body;

    let orderToUpdate
    try{
        orderToUpdate = await Order.findById(req.params.id);
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error, could not find order'});
    };

    if(!orderToUpdate){
        return res.status(404).json({ msg: 'Could not find order for this id' });
    }

    //Fixed price field where we save old price
    let fixedPrice = orderToUpdate.fixedPrice;
    let newTotalPrice = orderToUpdate.totalPrice;
    try{
        if(isPayNow){
            //10% off the price when pay now
            orderToUpdate.totalPrice = (newTotalPrice - (newTotalPrice/100) * 10);
        }else{
            orderToUpdate.totalPrice = fixedPrice;
        }
        orderToUpdate.isPayNow = isPayNow
        await orderToUpdate.save();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error, could not update order'});
    };

    res.status(200).json({ order: orderToUpdate.toObject({ getters: true }) });
};

//Create PDF on checkout
const pdfInvoice = async ( req, res ) => {
    
    let order;
    try{
        order = await Order.findById(req.params.id);
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server Error, could not find order'});
    };

    if(!order){
        return res.status(404).json({ msg: 'Could not find order for this id' });
    };

    const invoiceName = 'invoice-' + req.params.id + '.pdf';
    const invoicePath = path.join('uploads', 'invoice', invoiceName);

    const firstName = order.firstName;
    const lastName = order.lastName;
    const carName = order.name;
    const carModel = order.model;
    const startDate = new Date(order.startDate).toLocaleDateString('de-DE');
    const endDate = new Date(order.endDate).toLocaleDateString('de-DE');
    const totalDays = order.totalDays;
    const totalPrice = (order.totalPrice).toFixed(2);

    const pdfDoc = new PDFDocument()
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="' + invoiceName + '"'
    );

    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(26).text('Invoice', {
        underline: true, align: 'center'
    });
    pdfDoc.fontSize(16).text('Driver name: ' + firstName + ' ' + lastName);
    pdfDoc.fontSize(14).text('Car type ' + carName + ' ' + carModel);
    pdfDoc.text('---------------------------------');
    pdfDoc.fontSize(14).text('Rent time is from ' + startDate + ' to ' + endDate);
    pdfDoc.fontSize(14).text('for total ' + totalDays + ' days');

    pdfDoc.text('---------------------------------');
    pdfDoc.fontSize(20).text('Total Price: ' + totalPrice + ' Euro');

    pdfDoc.end();
};


exports.addOrder = addOrder;
exports.deleteOrder = deleteOrder;
exports.getUsersOrders = getUsersOrders;
exports.getOrderById = getOrderById;
exports.updatePayOption = updatePayOption;
exports.pdfInvoice = pdfInvoice;
