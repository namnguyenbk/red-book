const mongoose = require('mongoose');

const RedBookSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: false,
    },
    party_id: {
        type: String,
        required: false,
    },
    no_land: { // số thứ tự thửa đất
        type: String,
        required: true,
    },
    addr_id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    trans_history_id: {
        type: [String],
        required: false,
    },
    time_remain: {
        type: String,
        required: true,
    },
    source_provide: {
        type: String,
        required: true,
    },
    no_licence: {// số văn bản cấp sổ đỏ,
        type: String,
        required: true,
    },
    date_licencing: {
        type: Date,
        required: true,
    },
    detail_id: {
        type: String,
        required: true,
    },
    user_for: {
        type: String,
        required: true,
    }

});

// const Id_tran = new mongoose.Schema({
//     id_tran:{
//         type: String,
//         required: true,
//     }
// });

module.exports = mongoose.model('RedBook', RedBookSchema);