import db from '../util/database.js'
import bcrypt from "bcrypt-nodejs";

const Userinfo = function (e) {
    this.username = e.username;
    this.password = e.password;
    this.type = e.type;
}

Userinfo.create = (newUser, result) => {
    if (newUser.type == "สมาชิก") {
        db.query("INSERT INTO member SET username = ? ,password = ?", [newUser.username, newUser.password], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("create member account complete! this is response: ",res)
            result(null, res);
        });
    } else {
        db.query("INSERT INTO owner SET username = ? ,password = ?", [newUser.username, newUser.password], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("create owner account complete! this is response: ",res)
            result(null, res);
        });
    }

};

Userinfo.loginmember = (username, result) => {
    db.query("SELECT * FROM member WHERE username = ? ", username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Userinfo.loginowner = (username, result) => {
    db.query("SELECT * FROM owner WHERE username = ? ", username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Userinfo.validPassword = (loginpassword, datapassword) => {
    return bcrypt.compareSync(loginpassword, datapassword);
}

Userinfo.validateUser = (username) => {
    db.query("SELECT user FROM user WHERE username = ? ", username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

export default Userinfo;