const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    rb_id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    detail_info: {
        type: String,
        required: false,
    },
    date_create: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Asset', AssetSchema);