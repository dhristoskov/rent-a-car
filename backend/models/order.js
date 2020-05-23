const mongoose = require('mongoose');


//Order schema
const orderSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: {type: Number, required: true },
    totalPrice: {type: Number, required: true },
    fixedPrice: {type: Number, required: true },
    name:{ type: String, required: true },
    model:{ type: String, required: true },
    image: { type: String, required: true },
    isPayNow: { type: Boolean, default: false },
    car: {type: mongoose.Types.ObjectId, required: true, ref: 'Car'},
    customer: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Order', orderSchema)