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
    let date = '';
    if (!infoAsset.date) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        date = today;
    }
    let images = [];
    if (infoAsset.images && infoAsset.images.length != 0) {
        for (image of infoAsset.images) {
            images.push(image);
        }
    }
    asset = {
        _id: new mongoose.Types.ObjectId(),
        type,
        area,
        images,
        detail_info,
        date
    }
    let as = await Asset.findOneAndUpdate({ rb_id: infoAsset.rb_id }, { $push: { assets: asset } }, { upsert: true });
    let result = {};
    if (as) {
        result = {
            code: 1000,
            asset_id: asset._id
        };
    }

    return result;
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

    let as = await Asset.findOne({rb_id: assetQuery.rb_id});
    

    return {
        code: 10000,
        assets: as.assets,
    }
}
module.exports = {
    addAsset,
    getAsset
  }
