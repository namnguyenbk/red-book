const express = require('express');
const asyncHandler = require('express-async-handler');
const statisticCrl = require('../controllers/statistic.controller');

const router = express.Router();

router.route('/get').post(asyncHandler(getStatistic));

async function getStatistic(req,res){
    let result = await statisticCrl.getStatistic();
    res.json(result);
}

module.exports = router;