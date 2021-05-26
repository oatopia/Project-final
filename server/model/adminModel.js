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

Admin.deleteMemberbyId = (data,result) =>{
    db.query("DELETE FROM member WHERE member_ID = ?",data,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        result(null,res);    
    });
};

Admin.deleteOwnerbyId = (data,result) =>{
    db.query("DELETE FROM owner WHERE owner_ID = ?",data,(err,res)=>{
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
        console.log("Create factor success!!",res);
        result(null,res);  
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
    db.query("UPDATE factor SET factor_Title = ?, factor_Name = ?, image_Factor = ? WHERE factor_ID = ? ",[data.factor_Title,data.factor_Name,data.image_Factor,data.factor_ID],(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        result(null,res);    
    });
};

export default Admin;