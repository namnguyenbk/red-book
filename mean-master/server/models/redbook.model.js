const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('./address.model');
const RedBookSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    owner_id: {
        type: String,
        required: true,
    },
    no_land: { // số thứ tự thửa đất
        type: String,
        required: true,
    },
    addr_id: {type: Schema.Types.ObjectId, ref: 'Address'},
    type: {
        type: String,
        required: true,
    },
    trans: {
        type: [String],
        required: false,
    },
    exp: {
        type: String,
        required: true,
    },
    source_provide: {
        type: String,
        required: true,
        default: Date.now,
    },
    no_license: {// số văn bản cấp sổ đỏ,
        type: String,
        required: false,
    },
    created: {
        type: String,
        required: false,
        default: Date.now,
    },
    use_for: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    images: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },

});

module.exports = mongoose.model('RedBook', RedBookSchema);