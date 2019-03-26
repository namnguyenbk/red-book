const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    area1: {// diện tích đất sử dụng
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Detail', DetailSchema);