const express = require('express');
const asyncHandler = require('express-async-handler');
const addressController = require('../controllers/address.controller');

const router =  express.Router();
module.exports = router;

router.route('/add').post(asyncHandler(addAddress));
router.route('/get').post(asyncHandler(getAddress));




async function addAddress(req,res){
    let result = await addressController.add_addr(req.body);
    res.json(result);
}

async function getAddress(req,res){
    let result = await addressController.getFullAddr(req.body);
    res.json(result);
}
