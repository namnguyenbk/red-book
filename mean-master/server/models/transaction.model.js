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
    created: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    transaction_amount: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);