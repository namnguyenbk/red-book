const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    midname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: false,
    },
    phonenumber: {
        type: String,
        required: false,
        match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,"nhập đúng số điện thoại"],
    },
    id_card_number: {
        type: String,
        required: true,
        unique: true,
        // match: [/^[0-9]{12}$/, "nhập đúng số CMND"],
    },
    birth: {
        type: String,
        required: true,
    },
    postal_addr_id: {
        type: String,
        required: false,
    },
    address_id: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    status_id: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Person', PersonSchema);