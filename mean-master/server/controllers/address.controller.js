const Address = require('../models/address.model');
const mongoose = require('mongoose');

async function add_addr(addrInfo) {
    if(!addrInfo.address|| !addrInfo.street || !addrInfo.district ||!addrInfo.province ){
            return {
                code: 1001,
                result: {},
                message: 'parameter is missing!',
            }
        }
        
    let province = addrInfo.province;
    let district = addrInfo.district;
    let street = addrInfo.street;
    let address = addrInfo.address;

    let newAddress = new Address({
        _id: new mongoose.Types.ObjectId(),
        province,
        district,
        street,
        address
    });
    await newAddress.save();
    return{
        code:1000,
        addr_id: newAddress._id
    }
}

module.exports = {
    add_addr
  }