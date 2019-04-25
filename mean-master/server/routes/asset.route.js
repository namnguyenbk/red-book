const express = require('express');
const asyncHandler = require('express-async-handler');
const assetController = require('../controllers/asset.controller');

const router =  express.Router();
module.exports = router;

router.route('/add').post(asyncHandler(addAsset));
router.route('/get').post(asyncHandler(getAsset));
router.route('/upload_image').post(asyncHandler(uploadImage));




async function addAsset(req,res){
    let result = await assetController.addAsset(req.body);
    res.json(result);
}

async function getAsset(req,res){
    let result = await assetController.getAsset(req.body);
    res.json(result);
}

async function uploadImage(req, res){
    let result = await assetController.uploadImage(req.body);
    res.json(result);
}

