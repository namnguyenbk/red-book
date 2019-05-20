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
    
    // quantity of redbook
    let num_rb = dates.length;
    //get today date
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth();
    let year = dateNow.getFullYear();


    let num_new_rb_today = 0;
    // dates.map((dateDetail) =>{
    //     if(dateDetail[0] === day && dateDetail[1] === month && dateDetail[2] === year){
    //         num_new_rb_today++;
    //     }else if(dateDetail[0] !== day && dateDetail[1] === month && dateDetail[2] === year){
    //         num_new_rb_month++;
    //     }
    // });



    // statistic new rb add in range 50 day ago
    let num_new_rb_byday = [];
    for(let i of Array(50).keys()){
        let d = new Date();
        d.setDate(d.getDate() - i);
        let obj = {
            num_new: 0,
            date: d,
        };
        num_new_rb_byday.push(obj);
    }
    // num_new_rb_today = dates.filter((dateDetail) =>{
    //     return parseInt(dateDetail[0]) == day && parseInt(dateDetail[1]) == month && parseInt(dateDetail[2]) == year;
    // }).length;


    let i = 0;
    num_new_rb_byday.map((item)=>{
        num_new_rb_byday[i].num_new = dates.filter((dateDetail) =>{
            return parseInt(dateDetail[0]) == item.date.getDate() && parseInt(dateDetail[1]) == (item.date.getMonth() + 1) && parseInt(dateDetail[2]) == item.date.getFullYear();
        }).length;
        i++;
    });




    let num_uf_enterpri = 0;
    // find avg area of owner
    let uniqueOwner = [];
    let sumArea = 0;
    listRedBook.map((rb) =>{
        sumArea += rb.area;
        if(uniqueOwner.indexOf(rb.owner_id) == -1){
            uniqueOwner.push(rb.owner_id);
        }

        if(rb.use_for == 'Đất xây dựng công trình'){
            num_uf_enterpri++;
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

    let ratio_use_for = num_uf_enterpri/listRedBook.length;

    return {
        num_rb,
        ratio_use_for,
        avg_are_per_owner,
        num_rb_dis,
        num_new_rb_byday,
    };



}



module.exports = {
    getStatistic,
};