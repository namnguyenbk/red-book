const express = require('express');
const asyncHandler = require('express-async-handler');
const transactionController = require('../controllers/transaction.controller');

const router =  express.Router();
module.exports = router;

router.route('/add').post(asyncHandler(addTransaction));




async function addTransaction(req,res){
    let result = await transactionController.add_trans(req.body);
    res.json(result);
}