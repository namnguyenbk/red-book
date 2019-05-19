const Redbook = require('../models/redbook.model');
const Address = require('../models/address.model');
const Person = require('../models/person.model');



async function getStatistic(){
    let listRedBook = await Redbook.find({});
    // filter
    listRedBook = listRedBook.filter((rb) =>{
        let created = rb.created;
        if(created.includes('/')){
            return true;
        }else {
            return false;
        }
    });

    let dates = listRedBook.map((rb) =>{
        let dateDetail = rb.created.split('/');
        return dateDetail;
    });
    
    let num_rb = dates.length;
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth();
    let year = dateNow.getFullYear();
    let num_new_rb_today = 0;
    let num_new_rb_month = 0;
    // dates.map((dateDetail) =>{
    //     if(dateDetail[0] === day && dateDetail[1] === month && dateDetail[2] === year){
    //         num_new_rb_today++;
    //     }else if(dateDetail[0] !== day && dateDetail[1] === month && dateDetail[2] === year){
    //         num_new_rb_month++;
    //     }
    // });


    num_new_rb_today = dates.filter((dateDetail) =>{
        return parseInt(dateDetail[0]) == day && parseInt(dateDetail[1]) == month && parseInt(dateDetail[2]) == year;
    }).length;

    num_new_rb_month = dates.filter((dateDetail) =>{
        //console.log(parseInt(dateDetail[0]) != day && parseInt(dateDetail[1]) == month && parseInt(dateDetail[2]) == year);
        return parseInt(dateDetail[0]) != day && parseInt(dateDetail[1]) == month && parseInt(dateDetail[2]) == year;
    }).length;



    let uniqueOwner = [];
    let sumArea = 0;
    listRedBook.map((rb) =>{
        sumArea += rb.area;
        if(uniqueOwner.indexOf(rb.owner_id) == -1){
            uniqueOwner.push(rb.owner_id);
        }
    });
    let avg_are_per_owner = sumArea/uniqueOwner.length;
    let top_five_dis_detail = [];
    // map to address
    let mapAddr = await Promise.all(listRedBook.map(async (rb)=>{
        let addr = await Address.findOne({_id : rb.addr_id});
        let province = addr.province;
        let rbId = rb._id;
        return {
            province,
            rbId,
        };
    }));
    let uniqueDistrcict = [];
    let allDis = mapAddr.map((addr)=>{
        if(uniqueDistrcict.indexOf(addr.province) == -1){
            console.log(uniqueDistrcict);
            console.log(addr.province);
            uniqueDistrcict.push(addr.province);
        }
        return addr.province;
    });

    let num_rb_dis = uniqueDistrcict.map((dis)=>{
        let num = 0;
        allDis.map((di)=>{
            if(di == dis){
                num++;
            }
        });
        return {
            dis,
            num,
        };
    });

    num_rb_dis = num_rb_dis.sort((a,b)=>{
        return a.num < b.num ? 1: -1;
    });

    if(num_rb_dis.length > 5){
        num_rb_dis = num_rb_dis.slice(0,5);
    }


    return {
        num_rb,
        num_new_rb_today,
        num_new_rb_month,
        avg_are_per_owner,
        num_rb_dis,
    };



}

module.exports = {
    getStatistic,
};