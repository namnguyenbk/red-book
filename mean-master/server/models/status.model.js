const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Status', StatusSchema);