import db from '../util/database.js'

const factorinfo = function(e){
    this.id = e.id;
    this.factorname = e.id;
    this.weight = e.weight;
}

factorinfo.getallfactor = (f_info,result)=>{
    db.query("SELECT * FROM factor ",(err,res)=>{
        if(err){
            result(err);
        }
        console.log(res);
    });
};