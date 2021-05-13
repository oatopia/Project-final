import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginOwner.css';
import img from './img/loginimg.jpg'
import Navbar from './component/Navbar/Navbar.js'
import Axios from 'axios'
import Auth from './service/authService.js'


const Loginowner = () => {

    var history = useHistory();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        Auth.loginowner(username, password)
            .then(Response => {
                console.log(Response);
                if (Response.type == "สมาชิก") {
                    history.push("/member");
                    // window.location.reload();
                } else if (Response.type == "ผู้ประกอบการ") {
                    history.push("/owner");
                    // window.location.reload();
                }
            })
    }
    const currentUser = Auth.getCurrentUser();
    console.log("login page: ", currentUser);
    return (
        <>
            <Navbar></Navbar>
            <div className="owner-login-container">
                <div className="content-owner-login-container">
                    <form className="form-owner-login" onSubmit={handleLogin}>
                        <div>
                        <p id="h1-login-owner">เข้าสู่ระบบสำหรับ</p>
                        <p id="h1-login-owner">ผู้ประกอบการ</p>
                        </div>
                        
                        <div>
                        <p>ชื่อผู้ใช้</p>
                        <input className="text-input-owner-login" onChange={(e) => {
                            setusername(e.target.value);
                        }}></input>
                        </div>
                        <div>
                        <p>รหัสผ่าน</p>
                        <input type="password" className="text-input-owner-login" onChange={(e) => {
                            setpassword(e.target.value);
                        }}></input>
                        </div>
                        <br></br>
                        <button className="button-login-owner" type="submit">เข้าสู่ระบบ</button>
                        <hr/>
                        <button className="button-register-owner" type="submit">สร้างบัญชีใหม่</button>
                    </form>
                    <img src={img} className="img" width="300" height="470"></img>
                </div>
            </div>
        </>
    );
}

export default Loginowner;