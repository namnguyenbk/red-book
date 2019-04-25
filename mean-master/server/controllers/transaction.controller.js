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

async function list_trans(req) {
    var trans_data = [];
    try {
        let listId = req.list_tran_id;
        if (listId) {
            for( let i=0; i < listId.length; i ++){
                id = listId[i];
                let trans = await Transaction.findOne({ _id: id });
                if (trans) {
                    trans_data.push(trans);
                }
            }
            return {
                code : "1000",
                trans_data : trans_data
            }
        // lost data
        } else {
            return {
                code: "1001"
            }
        }
        // internal error
    } catch (error) {
        return {
            code: "999"
        }
    }
}



module.exports = {
    add_trans,
    list_trans
}