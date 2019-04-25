const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssetSchema = new mongoose.Schema({

    _id: Schema.Types.ObjectId,
    rb_id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    area: {
        type: String,
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
    date: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Asset', AssetSchema);