const express = require('express');
const { check } = require('express-validator');

const ordersController = require('../controllers/orders-controllers');
const router = express.Router();

//Add new order
router.post('/' , 
    [
        check('firstName', 'Please enter a valid first name').not().isEmpty().trim(),
        check('lastName', 'Please enter a valid last name').not().isEmpty().trim(),
        check('endDate', 'Please enter a valid number of seats').isISO8601().toDate(),
        check('startDate', 'Please enter a valid date').isISO8601().toDate() 
        .custom((value, {req}) => {
            if(value <= Date.now()){
                throw new Error('Invalide date');
            }
            return true;
        })      
    ],
    ordersController.addOrder
);
//Get order by Id
router.get('/:id', ordersController.getOrderById)
//Get all orders for user(be user id)
router.get('/user/:id', ordersController.getUsersOrders);
//Create PDF invoice
router.get('/invoice/:id', ordersController.pdfInvoice);
//Delete order
router.delete('/:id', ordersController.deleteOrder);
//Change price when pay now
router.patch('/option/:id', ordersController.updatePayOption);

module.exports = router;