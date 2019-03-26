const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
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
        default: Date.now,
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