const Redbook = require('../models/redbook.model');
const Address = require('../models/address.model');
const Joi = require('joi');
const Person = require('../models/person.model');
const mongoose = require('mongoose');
const Detail = require('../models/detail.model');
const searchSchema = Joi.object({
    province: Joi.string(),
    district: Joi.string(),
    street: Joi.string(),
    address: Joi.string(),
    owner_name: Joi.string(),
    max_size: Joi.number().required().error(err =>{
        return {
            code: 1001,
            result: {},
            message: 'max_size is required!',
        }
    }),
    min_size: Joi.number().required().error(err =>{
        return {
            code: 1001,
            result: {},
            message: 'min_size is required!',
        }
    }),
});


const addRbSchema = Joi.object({
    owner_id: Joi.string().required(),
    street: Joi.string().required(),
    district: Joi.string().required(),
    province: Joi.string().required(),
    address: Joi.string().required(),
    area: Joi.number().required(),
    type: Joi.number().required(),
    exp: Joi.string().required(),
    date_time: Joi.date().required(),
    num_licence: Joi.string().required(),
    user_for: Joi.string().required(),
    source_provide: Joi.string().required(),
    no_land: Joi.number().required(),
});

const changeInfoRBSchema = Joi.object({
    owner_id: Joi.string().required(),
    rb_id: Joi.string().required(),
});

async function search(searchObj){
    //searchObj = await  Joi.validate(searchObj, searchSchema,{ abortEarly: false});
    if(!searchObj.max_size || !searchObj.min_size){
        return {
            code: 1001,
            result: {},
            message: 'parameters is missing!'
        };
    }



    let province_name = searchObj.province? searchObj.province:/.*/;
    let district_name = searchObj.district? searchObj.district: /.*/;
    let street_name = searchObj.district?searchObj.street: /.*/;
    let address = searchObj.address? searchObj.address: /.*/;
    let owner_name = searchObj.owner_name? new RegExp(`^${searchObj.owner_name}$`): /.*/;
    let max_size = parseInt(searchObj.max_size);
    let min_size = searchObj.min_size;
    
    // let redBook1 = new Redbook({
    //     _id: new mongoose.Types.ObjectId(),
    //     no_land: 'N12',
    //     type: 'nha o',
    //     time_remain: '123',
    //     source_provide: 'nha nuoc cap',
    //     no_licence: 'DH123',
    //     detail_id: 'dsadsd',
    //     user_for: 'kinh doanh',
    // });

    // await redBook1.save();

    // let addr1 = new Address({
    //     province: 'Nam Dinh',
    //     district: 'Giao Thuy',
    //     street: '1B',
    //     address: '123 A',
    //     rbAddress: redBook1._id,
    // });

    // await addr1.save();

    // let p1 = new Person({
    //     _id: new mongoose.Types.ObjectId(),
    //     firstname: 'An',
    //     midname: 'Cong',
    //     lastname: 'Luu',
    //     fullname: 'Luu Cong An',
    //     id_card_number: '333334433333',
    //     birth: 20,
    //     address_id: 'dasdsadas',
    //     gender: 1,
    //     status_id: 'dasdsa',
    //     phonenumber: '034333333323'
    // });

    // await p1.save();
    
    let result = await Address.find({
        province: province_name,
        district: district_name,
        street: street_name,
        address: address,
    }).populate('rbAddress');

    if(result){
        result = result.map(addrObj =>{
            return addrObj.rbAddress;
        });

        result = result.filter(async (item)=>{
            let personId = item.owner_id;
            let person = await Person.find({}).where('_id').equals(personId);
            if(person){
                return person.fullname.match(owner_name) == null? false:true;
            }
            return false;
        });

        if(result.length > max_size){
            result  = result.slice(0,max_size);
        }
    }
    return {
        code: 1000,
        result: result,
        message: 'OK'
    };
}


async function addRB(infoRB){
    //infoRB = await Joi.validate(infoRB1, addRbSchema,{ abortEarly: false});
    // if(error){
    //     let result = {
    //         code: 1001,
    //         message: 'invalid input data',
    //     };
    //     return result;
    // }


    console.log(infoRB.owner_id);
    console.log(infoRB.street);
    console.log(infoRB.district);
    console.log(infoRB.province);
    console.log(infoRB.address);
    console.log(infoRB.area);
    console.log(infoRB.type);
    console.log(infoRB.exp);
    console.log(infoRB.num_license);
    console.log(infoRB.use_for);
    console.log(infoRB.source_provide);
    console.log(infoRB.no_land);

    if(!infoRB.owner_id || !infoRB.street || !infoRB.district ||
       !infoRB.province || !infoRB.address || !infoRB.area || 
       !infoRB.type || !infoRB.exp ||
       !infoRB.no_licence || !infoRB.user_for || !infoRB.source_provide ||
       !infoRB.no_land){
           return {
               code: 1001,
               result: {},
               message: 'parameter is missing!',
           }
       }
    let owner_id = infoRB.owner_id;
    let street = infoRB.street;
    let district = infoRB.district;
    let province = infoRB.province;
    let address = infoRB.address;

    let latidute = infoRB.latidute? infoRB.latidute: "";
    let longtidute = infoRB.longtidute? infoRB.longtidute: "";

    let area = infoRB.area;
    let type = infoRB.type;
    let exp = infoRB.exp;
    let date_time = infoRB.created;
    let num_licence = infoRB.no_licence;
    let user_for = infoRB.user_for;
    let source_provide = infoRB.source_provide;
    let no_land = infoRB.no_land;
    let trans = infoRB.trans;
    let images = infoRB.images;
    let description = infoRB.description;

    let newRB = new Redbook({
        _id: new mongoose.Types.ObjectId(),
        owner_id: owner_id,
        no_land: no_land,
        type: type,
        exp: exp,
        source_provide: source_provide,
        num_licence: num_licence,
        created: date_time,
        user_for: user_for,
        trans: trans,
        area: area,
        images: images,
        description: description,
    });

    

    let addr = new Address({
        _id: new mongoose.Types.ObjectId(),
        province: province,
        district: district,
        street: street,
        address: address,
        rbAddress: newRB._id,
        latidute: latidute,
        longtidute: longtidute,
    });

    newRB.addr_id = addr._id;
    await newRB.save();
    await addr.save();

    let result = {
        code: 1000,
        result:{
            redbook: newRB,
            address: addr,
        },
        rb_id: newRB._id,
        message: 'add red book successfully!'
    };

    return result;
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
        code: 10000,
        message: 'Not found redbook',
    }

}
module.exports = {
    search,
    addRB,
    getDetail,
};