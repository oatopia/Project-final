import db from '../util/database.js'

const Factorinfo = function(e){
    this.id = e.id;
    this.factorname = e.id;
    this.weight = e.weight;
}

Factorinfo.getallfactor = result =>{
    db.query("SELECT * FROM factor ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        console.log(res);
        result(null,res);    
    });
};

export default Factorinfo;