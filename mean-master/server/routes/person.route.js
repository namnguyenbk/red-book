const express = require('express');
const asyncHandler = require('express-async-handler');
const personController = require('../controllers/person.controller');

const router =  express.Router();
module.exports = router;

router.route('/add').post(asyncHandler(addOwner));
router.route('/change').post(asyncHandler(changeOwner));




async function addOwner(req,res){
    let result = await personController.add_owner(req.body);
    res.json(result);
}

async function changeOwner(req,res){
    let result = await personController.change_owner(req.body);
    res.json(result);
}