
import userModel from '../model/userModel.js'

export const create = (req,res) =>{
    const user = new userModel({
        username: req.body.username,
        password: req.body.password,
        type: req.body.type
    });
    userModel.create(user,(err,data)=>{
        if(err){
            res.status(500).send({
                message:
                err.message 
            })
        }else{
            res.send(data);
        }
            
    });
    res.send("register sucessfull");
    console.log(user);
};

export const login = (req,res) =>{
    const userlogin = new userModel({
        username: req.body.username,
        password: req.body.password
    });
    userModel.login(userlogin,(err,data)=>{
        if(username == data.username){
            if(password == data.password){
                res.redirect();
            }
        }
        if(err){
            if(err.kind == "not found"){
                res.status(400).send({
                    message: 'not found'
                });
            }else{
                res.status(500).send({
                    message: 'Error'
                });
            }
        }else{
            console.log(data);
            res.json(data);
        }
        
    });
    res.redirect("/client/src/member.js")
    res.send("login ");
    
};