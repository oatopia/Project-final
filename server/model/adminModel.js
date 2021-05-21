import db from '../util/database.js'
const Admin = function(e){}
Admin.getallUser = result =>{
    db.query("SELECT * FROM member ; SELECT * FROM owner ",(err,res)=>{
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
    db.query("INSERT INTO factor SET ?",newfactor,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        result(null,res);  
        // console.log("create factor:",res);
    });
};

Admin.deleteFactorbyId = (data,result) =>{
    db.query("DELETE FROM factor WHERE factor_ID = ?",data,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        result(null,res);    
    });
};

Admin.updateUserbyId = (data,result) =>{
    db.query("UPDATE userinformation SET username = ?, type = ? WHERE user_id = ? ",[data.username,data.type,data.user_id],(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        result(null,res);    
    });
};

Admin.updateFactorbyId = (data,result) =>{
    db.query("UPDATE factor SET factor_Name = ?, image_Factor = ? WHERE factor_ID = ? ",[data.Factor_name,data.Image_factor,data.Id],(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        result(null,res);    
    });
};

export default Admin;