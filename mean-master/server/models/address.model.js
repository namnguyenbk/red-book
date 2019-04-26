const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
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
        required: true,
    },
    latidute: {
        type: Number,
        required: false,
    },
    longtidute: {
        type: Number,
        required: false,
    },
    rbAddress:{
        type: Schema.Types.ObjectId, 
        ref: 'RedBook',
        required: false,
    },

});

module.exports = mongoose.model('Address', AddressSchema);