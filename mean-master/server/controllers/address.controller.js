const Address = require('../models/address.model');
const mongoose = require('mongoose');

async function add_addr(addrInfo) {
    if(!addrInfo.street || !addrInfo.district ||!addrInfo.province ){
            return {
                code: 1001,
                result: {},
                message: 'parameter is missing!',
            }
        }
        
    let province = addrInfo.province;
    let district = addrInfo.district;
    let street = addrInfo.street;
    let address = addrInfo.address ? addrInfo.address : " " ;

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

async function getFullAddr(req){
    if(!req.addr_id){
        return {
            code : "999"
        }
    }else{
        let addr = await Address.findOne({_id: req.addr_id});
        if(addr){
            let fullAddr = addr.address + ", " + addr.street + ", " + addr.district + ", " + addr.province;
            let lat = addr.latidute;
            let lng = addr.longtidute;
            return {
                code : "1000",
                full_addr : fullAddr,
                lat : lat,
                lng : lng
            }
        }
    }
}

module.exports = {
    add_addr,
    getFullAddr,
  }