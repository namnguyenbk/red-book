const Redbook = require('../models/redbook.model');
const Person = require('../models/person.model');
const mongoose = require('mongoose');


async function add_owner(ownerInfo) {
    //const infoObj = await Joi.validate(ownerInfo, addInfoRBSchema, { abortEarly: false });
    if(!ownerInfo.fname|| !ownerInfo.lname || !ownerInfo.birth ||
        !ownerInfo.gender || !ownerInfo.card_id || !ownerInfo.postal_addr_id){
            return {
                code: 1001,
                result: {},
                message: 'parameter is missing!',
            }
        }
    //let RB = await Redbook.findOne({_id: ownerInfo.rb_id});
        let firstname = ownerInfo.fname;
        let lastname = ownerInfo.lname;
        let midname = !ownerInfo.mname ? '' : ownerInfo.mname;
        let fullname = firstname + ' ' + midname + ' ' + lastname;
        let birth = ownerInfo.birth;
        let phonenumber = !ownerInfo.phonenumber ? '' : ownerInfo.phonenumber;
        let gender = ownerInfo.gender;
        let id_card_number = ownerInfo.card_id;
        let postal_addr_id = ownerInfo.postal_addr_id;
        let address_id = ownerInfo.postal_addr_id;
        let status_id = !ownerInfo.status_id ? '' : ownerInfo.status_id;
        let newOwner = new Person({
            _id: new mongoose.Types.ObjectId(),
            firstname,
            lastname,
            midname,
            fullname,
            phonenumber,
            status_id,
            birth,
            gender,
            id_card_number,
            postal_addr_id,
            address_id
        });
        await newOwner.save();

    return {
        code: 1000,
        owner_id: newOwner._id,
    };
}

async function change_owner(infoObj){
    //const infoObj = await Joi.validate(infoObj1, changeInfoRBSchema,{ abortEarly: false});
    if(!infoObj.rb_id || !infoObj.owner_id){
        return {
            code: 1001,
            message: 'parameter is missing!',
        }
    }
    let RB = await Redbook.findOne({ _id: infoObj.rb_id });
    RB.owner_id = infoObj.owner_id;
    await RB.save();
    return {
        code: 1000,
        RB,
        rb_id: RB._id,
    };
}

async function list_owner(){
     let list_owner  = await Person.find({});
     if( list_owner){
         return {
             code : "1000",
             list_owner : list_owner
         }
     }else{
         return {
             code : "9999"
         }
     }
}

module.exports = {
    change_owner,
    add_owner,
    list_owner
};