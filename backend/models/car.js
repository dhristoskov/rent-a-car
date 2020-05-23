const mongoose = require('mongoose');

//Car schema
const carSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    model:{ type: String, required: true },
    carType:{ type: String, required: true },
    seats:{ type: Number, required: true },
    gears:{ type: String, required: true },
    clima:{ type: Boolean, default: true, required: true },
    price: {type: Number, required: true },
    image: { type: String, required: true },
    qt: {type: Number, required: true}
});

module.exports = mongoose.model('Car', carSchema);