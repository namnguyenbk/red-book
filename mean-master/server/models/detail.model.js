const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DetailSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
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