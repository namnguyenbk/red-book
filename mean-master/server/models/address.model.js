const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    province: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    latidute: {
        type: Number,
        required: false,
    },
    longtidute: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('Address', AddressSchema);