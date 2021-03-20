
import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
// import { jwtSecret} from '../config/Jwt-Config'


// create User
export const create = (req,res) =>{
    const user = new userModel({
        username: req.body.username,
        password: req.body.password,
        type: req.body.type
    });
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password,salt);
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
    const username = req.body.username
    const password = req.body.password
    // const userlogin = new userModel({
    //     username: req.body.username,
    //     password: req.body.password
    // });
    userModel.login(username,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            if(username == data[0].username){
                if(password == data[0].password){
                    res.send(data[0]);
                    console.log(data[0]);
                }
            }
        }
    });
    
    
};