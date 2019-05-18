const express = require('express');
const asyncHandler = require('express-async-handler');
const redbookCrl = require('../controllers/redbook.controller');

const router =  express.Router();


router.route('/add').post(asyncHandler(addRB));
router.route('/getdetail').post(asyncHandler(getDetail));
router.route('/update').post(asyncHandler(updateRebook));



async function addRB(req,res){
    let result = await redbookCrl.addRB(req.body);
    res.json(result);
}


async function getDetail(req,res){
    let result = await redbookCrl.getDetail(req.body);
    res.json(result);
}

async function updateRebook(req,res){
    let result = await redbookCrl.updateRedbook(req.body);
    res.json(result);
}
module.exports = router;