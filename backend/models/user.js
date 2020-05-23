const mongoose = require('mongoose');

//User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, unique: true, minlength: 6 },
    password: { type: String, required: true, minlength: 6},
    resetToken: { type: String},
    expToken: {type: Date},
    orders: [{type: mongoose.Types.ObjectId, required: true, ref: 'Order'}]
});

module.exports = mongoose.model('User', userSchema);