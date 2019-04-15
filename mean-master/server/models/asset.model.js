const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    
    rb_id: {
        type: String,
        required: true,
    },
    assets: [{
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
        date: {
            type: String,
            required: false,
        }
    }]
});

module.exports = mongoose.model('Asset', AssetSchema);