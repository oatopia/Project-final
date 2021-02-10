import { request } from 'express';
import db from '../util/database.js'

const Userinfo = function(e) {
    this.username = e.username;
    this.password = e.password;
    this.type = e.type;
}

Userinfo.create = (newUser,result) =>{
    db.query("INSERT INTO userinformation SET ?",newUser,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        

        console.log("create user:" ,{ ...newUser});
    });
};

Userinfo.login = (userlog,result) =>{
    db.query("SELECT * FROM userinformation WHERE username = ? ",userlog.username,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        
        console.log("found user",res[0]);
        
        return res;
    });
};

export default Userinfo;