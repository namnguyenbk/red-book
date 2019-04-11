const express = require('express');
const asyncHandler = require('express-async-handler');
const rebbookCrl = require('../controllers/redbook.controller');

const router = express.Router();
module.exports = router;

router.route('/').post(asyncHandler(searchRB));

async function searchRB(req,res){
    let result = await rebbookCrl.search(req.body);
    res.json(result);
}