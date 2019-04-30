const Transaction = require('../models/transaction.model');
const Redbook = require('../models/redbook.model');
const Person = require('../models/person.model');
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
                let transData = new Object();
                transData.id = trans._id;
                transData.created = trans.created;
                transData.type = trans.type;
                transData.description = trans.description;
                transData.transaction_amount = trans.transaction_amount;
                if (trans) {
                    let partyA = await Person.findOne({ _id: trans.partyA_id});
                    transData.partyA = partyA;
                    // trans.set('partyA', partyA);
                    let partyB = await Person.findOne({ _id: trans.partyB_id});
                    // trans.set('partyB', partyB);
                    transData.partyB = partyB;
                    trans_data.push(transData);
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
        console.log(error);
        
        return {
            code: "999"
        }
    }
}



module.exports = {
    add_trans,
    list_trans
}