const express = require('express');
const { check } = require('express-validator');

const carsControllers = require('../controllers/cars-controllers');
//Image upload helper
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

//Add new car route
router.post('/',
    fileUpload.single('image'),
    [
        check('name', 'Please enter a valid car name').not().isEmpty().trim(),
        check('model', 'Please enter a valid car model').not().isEmpty().trim(),
        check('carType', 'Please enter a valid car type').not().isEmpty().trim(),
        check('seats', 'Please enter a valid number of seats').not().isEmpty().isNumeric().trim().isInt({gt: 1, lt: 8 }),
        check('gears', 'Please enter a valid gears type').not().isEmpty().trim(),
        check('price', 'Please enter a valid price').not().isEmpty().isNumeric().trim().isFloat({gt: 0}),
        check('qt', 'Please enter a valid number of quantity').not().isEmpty().isNumeric().trim().isInt({gt: 0})
    ],
    carsControllers.postCar
);
//Get all cars
router.get('/', carsControllers.getAllCars);
//Get by Id
router.get('/:id', carsControllers.getCarById);
//Offers Cars - landing page top cars
router.get('/offers/cars', carsControllers.getOfferCars);
//Sort by Name/Model
router.get('/sort/:name', carsControllers.getCarByName);

module.exports = router;