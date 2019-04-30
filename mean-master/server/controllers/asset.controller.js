const Asset = require('../models/asset.model');
const Joi = require('joi');
const mongoose = require('mongoose');

const AssetSchema = Joi.object({
    rb_id: Joi.string().required(),
    area: Joi.string().required(),
    type: Joi.string().required(),
    detail_info: Joi.string().required(),
});

const AssetQuerySchema = Joi.object({
    rb_id: Joi.string().required()
});


async function addAsset(infoAsset) {
    //infoAsset = await Joi.validate(infoAsset, AssetSchema, { abortEarly: false });
    if(!infoAsset.rb_id|| !infoAsset.area || !infoAsset.type ||!infoAsset.detail_info ){
        return {
            code: 1001,
            result: {},
            message: 'parameter is missing!',
        }
    }
    let rb_id = infoAsset.rb_id;
    let area = infoAsset.area;
    let type = infoAsset.type;
    let detail_info = infoAsset.detail_info;
    let date = infoAsset.date;

    let asset  = new Asset({
        _id: new mongoose.Types.ObjectId(),
        rb_id : rb_id,
        type,
        area,
        detail_info,
        date 
    })
    let as = await asset.save();
    if (as) {
        return {
            code: "1000",
            asset_id: asset._id
        }
    }else{
        return {
            code : "9999"
        }
    }
}

async function uploadImage(assetData){

    if( !assetData.asset_id || !assetData.rb_id){
        return {
            code : "1001",
            message : "thieu asset id hoac rb_id"
        }
    }


    let images = [];
    if (assetData.images && assetData.images.length != 0) {
        for (image of assetData.images) {
            if( image)
            images.push(image);
        }
        let assetUpdate = {
            images : images
        }
        try {
            let asset = await Asset.findOne({ _id: assetData.asset_id });
            asset.images = images;
            asset.save();
            if( asset){
                return {
                    code : "1000"
                }
            }  
        } catch (error) {
            console.log(error);
            return {
                code : "9999"
            }
        }
    }else{
        console.log("no image");
    }
}


async function getAsset(assetQuery) {
    //searchObj = await Joi.validate(assetQuery, AssetQuerySchema, { abortEarly: false });
    if(!assetQuery.rb_id){
        return {
            code: 1001,
            result: {},
            message: 'parameter is missing!',
        }
    }

    let as = await Asset.find({rb_id: assetQuery.rb_id});
    if(as){
        return {
            code: 1000,
            assets: as,
        }
    }else{
        return {
            code: 1001,
        }
    }
}
module.exports = {
    addAsset,
    getAsset,
    uploadImage,
  }
