const Transaction = require('../models/transaction.model');
const Redbook = require('../models/redbook.model');
const mongoose = require('mongoose');


async function add_trans(transInfo) {
    if(!transInfo.rb_id|| !transInfo.owner_old || !transInfo.owner_id ||
        !transInfo.type || !transInfo.created || !transInfo.transaction_amount){
            return {
                code: 1001,
                result: {},
                message: 'parameter is missing!',
            }
        }

    let partyA_id = transInfo.owner_old;
    let partyB_id = transInfo.owner_id;
    let created = transInfo.created;
    let type = transInfo.type;
    let description = !transInfo.description ? '' : transInfo.description;
    let transaction_amount = transInfo.transaction_amount;

    let newTrans = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        partyA_id,
        partyB_id,
        created,
        type,
        description,
        transaction_amount,
    });
    await newTrans.save();

    let RB = await Redbook.findOne({ _id: transInfo.rb_id });
    RB.trans.push(newTrans._id);
    await RB.save();
    return {
        code: 1000,
    }
}


module.exports = {
    add_trans
  }