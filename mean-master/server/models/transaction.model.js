const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    personA_id: {
        type: String,
        required: false,
    },
    personB_id: {
        type: String,
        required: false,
    },
    partyA_id: {
        type: String,
        required: false,
    },
    partyB_id: {
        type: String,
        required: false,
    },
    time_trans: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    trans_amount: {
        type: number,
        required: true,
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);