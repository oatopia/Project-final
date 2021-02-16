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
    db.query("SELECT * FROM userinformation WHERE username = ? ", userlog,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        // if(res[0].lenght){
        //     console.log("found user",res[0]);
        //     result(null,res[0]);
        //     return;
        // }
        console.log(res);
        result(null,res);
    });
};

export default Userinfo;