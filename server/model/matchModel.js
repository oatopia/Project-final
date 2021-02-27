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

Factorinfo.createWeight = ([newWeight],result) =>{
    db.query("INSERT INTO weight (weight_id, comparator, weight) VALUES ?",[newWeight.map(item=>[item.Id,item.Image,item.Weight])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        

        console.log("create user:" ,{ ...newWeight});
    });
}

export default Factorinfo;