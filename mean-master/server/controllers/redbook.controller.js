const Redbook = require('../models/redbook.model');
const Address = require('../models/address.model');
const Joi = require('joi');
const Person = require('../models/person.model');
const mongoose = require('mongoose');
const Detail = require('../models/detail.model');

async function search(searchObj){

    // validate just one parameter max_size, min_size is useless
    if(!searchObj.max_size){
        return {
            code: 1001,
            result: {},
            message: 'parameter is missing!'
        };
    }

    // get parameters
    let province_name = searchObj.province? searchObj.province:/.*/;
    let district_name = searchObj.district? searchObj.district: /.*/;
    let street_name = searchObj.street? searchObj.street: /.*/;
    let address = searchObj.address? searchObj.address: /.*/;
    let owner_name = searchObj.owner_name? searchObj.owner_name: null;
    let max_size = parseInt(searchObj.max_size);
    
    let result = await Address.find({
        province: province_name,
        district: district_name,
        street: street_name,
        address: address,
    }).populate('rbAddress');

    if(result){

        // get redbook obj from addres obj
        result = result.map(addrObj =>{
            return addrObj.rbAddress;
        });

        // deprecate null and undefined obj
        result = result.filter( (item) => {return item !== null && item !==undefined });

        // filter with owner name
        let newResult = [];
        if(owner_name != null){
            await Promise.all(result.map(async (item)=>{
                let personId = item.owner_id;
                let person = await Person.find({}).where('_id').equals(personId);
                let check = false;
                if(person[0]){
                    console.log('=========================================');
                    console.log('-->'+person[0].fullname +'-->'+owner_name + '-->'+person[0].fullname.includes(owner_name));
                    if(person[0].fullname.toLowerCase().includes(owner_name.toLowerCase())){
                        await newResult.push(item);
                    }
                }
            }));


            if(newResult.length > max_size){
                newResult  = newResult.slice(0,max_size);
            }
    
            return {
                code: 1000,
                result: newResult,
                message: 'OK'
            };
        }

        // get right quantity of max value

        if(result.length > max_size){
            result  = result.slice(0,max_size);
        }

        return {
            code: 1000,
            result: result,
            message: 'OK'
        };
        
    }

    return {
        code: 1000,
        result: result,
        message: 'OK'
    };
}


async function addRB(infoRB){
    if(!infoRB.owner_id || !infoRB.no_land || !infoRB.province ||
       !infoRB.type || !infoRB.exp || !infoRB.source_provide ||
       !infoRB.no_license || !infoRB.use_for || !infoRB.district ||
       !infoRB.street || !infoRB.address || !infoRB.area){
           return {
               code: 1001,
               result: {},
               message: 'parameter is missing!',
           }
       }
    
    // get address info
    let province = infoRB.province;
    let district = infoRB.district;
    let street = infoRB.street;
    let address = infoRB.address;

    let newAddress = new Address({
        _id: new mongoose.Types.ObjectId(),
        province,
        district,
        street,
        address
    });
    

    // get note book info
    let owner_id = infoRB.owner_id;
    let area = infoRB.area;
    let type = infoRB.type;
    let exp = infoRB.exp;
    let created = infoRB.created;
    let no_license = infoRB.no_license;
    let use_for = infoRB.use_for;
    let source_provide = infoRB.source_provide;
    let no_land = infoRB.no_land;
    let trans = infoRB.trans;
    let images = infoRB.images;
    let description = infoRB.description;

    let newRB = new Redbook({
        _id: new mongoose.Types.ObjectId(),
        owner_id: owner_id,
        no_land: no_land,
        addr_id: newAddress._id,
        type: type,
        exp: exp,
        source_provide: source_provide,
        no_license: no_license,
        created: created,
        use_for: use_for,
        trans: trans,
        area: area,
        images: images,
        description: description,
    });
    newAddress.rbAddress = newRB._id;
    await newAddress.save();
    await newRB.save();

    let result = {
        code: 1000,
        rb_id: newRB._id,
        message: 'add red book successfully!'
    };

    return result;
}

async function change_owner(infoObj){
    //const infoObj = await Joi.validate(infoObj1, changeInfoRBSchema,{ abortEarly: false});
    if(!infoObj.rb_id || !infoObj.owner_id){
        return {
            code: 1001,
            message: 'parameter is missing!',
        }
    }
    let RB = await Redbook.findOne({_id: infoObj.rb_id});
    RB.owner_id = infoObj.owner_id;
    await RB.save();
    return {
        code: 1000,
        RB,
        rb_id: RB._id,
    };
}


async function getDetail(objId){
    if(!objId){
        let result = {
            code: 1001,
            message: 'parameter not valid',
        };
        return result;
    }

    let rbId = objId.rb_id;

    let rb = await Redbook.findOne({_id: rbId});
    if(rb){
        let addr = await Address.findOne({rbAddress: rb._id});
        if(addr){
            let address = addr.address + addr.street + addr.district + addr.province;
            let person = await Person.findOne({_id: rb.owner_id});
            let result = {
                redbook: rb,
                address: address,
                owner: person,
            };

            return result;
        }
    }

    return {
        code: 1000,
        message: 'Not found redbook',
    }

}
module.exports = {
    search,
    addRB,
    change_owner,
    getDetail,
};