import userModel from "../model/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from '../config/Jwt-Config.js'
import bcrypt from "bcrypt-nodejs";


// create User
export const create = (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  });

  if (user.type == 'สมาชิก') {
    userModel.getmember(user.username, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        if (data.length > 0) {
          console.log("check")
          res.send({ message: 'มีชื่อผู้ใช้งานแล้ว' })
        } else {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
          userModel.create(user, (err, data) => {
            if (err) {
              res.status(500).send({
                message: err.message,
              });
            } else {
              res.send(data);
            }
          });
        }
      }
    });

  } else {
    userModel.getowner(user.username, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        if (data.length > 0) {
          res.send({ message: 'มีชื่อผู้ใช้งานแล้ว' })
        } else {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
          userModel.create(user, (err, data) => {
            if (err) {
              res.status(500).send({
                message: err.message,
              });
            } else {
              res.send(data);
            }
          });
        }
      }
    });

  }



};

export const loginmember = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username: ", username, "|| Password: ", password);
  userModel.loginmember(username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DATA", data.length)
      if (data.length > 0) {
        var passwordIsValid = userModel.validPassword(password, data[0].password);
        if (!passwordIsValid) {
          return res.send({
            accessToken: null,
            message: "ข้อมูลยืนยันตัวตนไม่ถูกต้อง"
          });
        }
        var token = jsonwebtoken.sign({ id: data[0].member_ID }, jwtSecret, {
          expiresIn: 86400, // 24 hours
        });
        res.send({
          member_ID: data[0].member_ID,
          username: data[0].username,
          authen: true,
          accessToken: token
        });
      } else {
        res.send({message: "ข้อมูลยืนยันตัวตนไม่ถูกต้อง" })
      }
    }
  });
};


export const loginowner = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username: ", username, "|| Password: ", password);
  userModel.loginowner(username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if(data.length > 0){
        var passwordIsValid = userModel.validPassword(password, data[0].password);
        if (!passwordIsValid) {
          return res.send({
            accessToken: null,
            message: "ข้อมูลยืนยันตัวตนไม่ถูกต้อง",
          });
        }
        var token = jsonwebtoken.sign({ id: data[0].owner_ID }, jwtSecret, {
          expiresIn: 86400, // 24 hours
        });
        res.send({
          owner_ID: data[0].owner_ID,
          username: data[0].username,
          authen: true,
          accessToken: token
        });
      }else{
        res.send({message: "ข้อมูลยืนยันตัวตนไม่ถูกต้อง" })
      }
      
    }
  });
};