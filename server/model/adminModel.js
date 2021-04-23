import db from '../util/database.js'
const Admin = function(e){}
Admin.getallUser = result =>{
    db.query("SELECT * FROM userinformation ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        console.log("User info: ",res);
        result(null,res);    
    });
};

Admin.getallfactor = result =>{
    db.query("SELECT * FROM factor ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        console.log("factor info: ",res);
        result(null,res);    
    });
};

Admin.deleteUserbyId = (data,result) =>{
    db.query("DELETE FROM userinformation WHERE user_id = ?",data,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        result(null,res);    
    });
};

Admin.insertFactor = (newfactor,result) =>{
    db.query("INSERT INTO factor SET ?",[newfactor],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("create factor:",res);
    });
};

export default Admin;