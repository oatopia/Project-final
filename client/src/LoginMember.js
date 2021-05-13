import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginMember.css';
import img from './img/loginimg.jpg'
import Navbar from './component/Navbar/Navbar.js'
import Axios from 'axios'
import Auth from './service/authService.js'


const Loginmember = () => {

    var history = useHistory();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const type = "สมาชิก";

    const handleLogin = (e) => {
        e.preventDefault();
        Auth.loginmember(username, password)
            .then(Response => {
                console.log(Response);
                    history.push("/member");
            })
    }
    const currentUser = Auth.getCurrentUser();
    console.log("login page: ", currentUser);
    return (
        <div className="login-member-container">
            <div className="Navbar-container">
                <Navbar />
            </div>

            <div className="content-login-member-container">
                <div className="content-login-container">
                    <form className="form-login-member" onSubmit={handleLogin}>
                        <h1 id="head-login">เข้าสู่ระบบสำหรับสมาชิก</h1>
                        <p>ชื่อผู้ใช้</p>
                        <input className="text-input" onChange={(e) => {
                            setusername(e.target.value);
                        }}></input>
                        <p>รหัสผ่าน</p>
                        <input type="password" className="text-input" onChange={(e) => {
                            setpassword(e.target.value);
                        }}></input>
                        <br></br>
                        <button className="buttonregister" type="submit">เข้าสู่ระบบ</button>
                        <hr />
                        <button className="buttonregister2" type="submit">สร้างบัญชีใหม่</button>
                    </form>
                    <img src={img} className="img" width="300" height="470"></img>
                </div>
            </div>
        </div>
    );
}

export default Loginmember;