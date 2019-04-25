const express = require('express');
const asyncHandler = require('express-async-handler');
const transactionController = require('../controllers/transaction.controller');

const router =  express.Router();
module.exports = router;

router.route('/add').post(asyncHandler(addTransaction));
router.route('/list').post(asyncHandler(listTransaction));



async function addTransaction(req,res){
    let result = await transactionController.add_trans(req.body);
    res.json(result);
}

async function listTransaction(req,res){
    let result = await transactionController.list_trans(req.body);
    res.json(result);
}