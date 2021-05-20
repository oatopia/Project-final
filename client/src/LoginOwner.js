import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginOwner.css';
import img from './img/loginown.jpg'
import Navbar from './component/Navbar/Navbar.js'
import Auth from './service/authService.js'


const Loginowner = () => {

    var history = useHistory();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        Auth.loginowner(username, password)
            .then(Response => {
                history.push("/owner");
            })
    }
    const currentUser = Auth.getCurrentUser();
    console.log("login page: ", currentUser);
    return (
        <div className="login-owner-page-container">
            <div className="Navbar-login-owner-container">
            <Navbar/>
            </div>
            <div className="owner-login-container">
                <div className="content-owner-login-container">
                    <form className="form-owner-login" onSubmit={handleLogin}>
                        <div>
                            <h1 id="h-1" className="h1-login-owner">เข้าสู่ระบบสำหรับ</h1>
                            <h1 id="h-2" className="h1-login-owner">ผู้ประกอบการ</h1>
                        </div>

                        <div className="username-text-owner">
                            <p className="username-head">ชื่อผู้ใช้*</p>
                            <input className="text-input-owner-login" onChange={(e) => {
                                setusername(e.target.value);
                            }}></input>
                        </div>
                        <div className="password-text-owner">
                            <p>รหัสผ่าน*</p>
                            <input type="password" className="text-input-owner-login" onChange={(e) => {
                                setpassword(e.target.value);
                            }}></input>
                        </div>
                        <br></br>
                        <button className="button-login-owner" type="submit">เข้าสู่ระบบ</button>
                        <hr />
                        <button className="button-register-owner" type="submit">สร้างบัญชีใหม่</button>
                    </form>
                    <img src={img} className="img" width="300" height="430"></img>
                </div>
            </div>
        </div>
    );
}

export default Loginowner;