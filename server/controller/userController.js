import userModel from "../model/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret} from '../config/Jwt-Config.js'
import bcrypt from "bcrypt-nodejs";


// create User
export const create = (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  });
  
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
  // console.log(user);
};

export const loginmember = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
    console.log("Username: ",username,"|| Password: ",password);
  userModel.loginmember(username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("user model return data",data)
      console.log('password',data[0].password)
      var passwordIsValid = userModel.validPassword(password,data[0].password);
      if (!passwordIsValid) {
        return res.send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jsonwebtoken.sign({ id: data[0].member_ID}, jwtSecret, {
        expiresIn: 86400, // 24 hours
      });
      res.send({
        member_ID: data[0].member_ID,
        username: data[0].username,
        authen: true,
        accessToken: token
      });
      }
  });
};


export const loginowner = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
    console.log("Username: ",username,"|| Password: ",password);
  userModel.loginowner(username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("user model return data",data)
      var passwordIsValid = userModel.validPassword(password,data[0].password);
      console.log('check valid',passwordIsValid)
      if (!passwordIsValid) {
        return res.send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jsonwebtoken.sign({ id: data[0].owner_ID}, jwtSecret, {
        expiresIn: 86400, // 24 hours
      });
      res.send({
        owner_ID: data[0].owner_ID,
        username: data[0].username,
        authen: true,
        accessToken: token
      });
      }
  });
};