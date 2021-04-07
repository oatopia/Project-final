import db from '../util/database.js'

const Matching = function(e){
    this.id = e.id;
    this.factorname = e.id;
    this.weight = e.weight;
}

Matching.getallfactor = result =>{
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

Matching.createWeight = ([newWeight],result) =>{
    db.query("INSERT INTO weight (weight_id, comparator, weight) VALUES ?",[newWeight.map(item=>[item.Id,item.Image,item.Weight])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        

        console.log("create user:" ,{ ...newWeight});
    });
}

Matching.getallDormScore = result =>{
    db.query("SELECT * FROM Scoring_Factors ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        result(null,res);    
    });
};

Matching.getDormbyID = (Array_ID,result) =>{
    db.query("SELECT * FROM dormitory WHERE Dorm_ID IN (?)",[Array_ID],(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        result(null,res);    
    });
};

Matching.searchbyName = (name,result) =>{
    db.query("SELECT * FROM dormitory WHERE Dorm_Name = ?",name,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        result(null,res);    
    });
};

export default Matching;