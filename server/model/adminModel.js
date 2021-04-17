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

export default Admin;