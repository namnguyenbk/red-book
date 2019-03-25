const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true,
    },
    status_id: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    addr_id: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    party_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Party', PartySchema);