import db from '../util/database.js'
import bcrypt from "bcrypt-nodejs";

const Userinfo = function(e) {
    this.username = e.username;
    this.password = e.password;
    this.type = e.type;
}

Userinfo.create = (newUser,result) =>{
    if(newUser.type == "สมาชิก"){
        db.query("INSERT INTO member SET username = ? ,password = ?",[newUser.username,newUser.password],(err,res)=>{
            if(err){
                console.log("error: ",err);
            result(err,null);
            return;
            }
            result(null,res);
        });
    }else{
        db.query("INSERT INTO owner SET username = ? ,password = ?",[newUser.username,newUser.password],(err,res)=>{
            if(err){
                console.log("error: ",err);
            result(err,null);
            return;
            }
            result(null,res);
        });
    }
    
};

Userinfo.login = (username,result) =>{
    db.query("SELECT * FROM user WHERE username = ? ", username,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log(res);
        result(null,res);
    });
};

Userinfo.validPassword =  (loginpassword,datapassword)=> {
    return bcrypt.compareSync(loginpassword, datapassword);
}

Userinfo.validateUser = (username) =>{
    db.query("SELECT username FROM user WHERE username = ? ", username,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log(res);
        result(null,res);
    });
}

export default Userinfo;