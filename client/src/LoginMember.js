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
                        <div>
                            <p className='p-text'>ชื่อผู้ใช้*</p>
                            <input className="text-input-username-loginmember" onChange={(e) => {
                                setusername(e.target.value);
                            }}></input>
                        </div>
                        <div>
                            <p className='p-text'>รหัสผ่าน*</p>
                            <input type="password" className="text-input-username-loginmember" onChange={(e) => {
                                setpassword(e.target.value);
                            }}></input>
                        </div>
                        <br></br>
                        <button className="button-login-member" type="submit">เข้าสู่ระบบ</button>
                        <hr />
                        <button className="buttonnew-member" type="submit">สร้างบัญชีใหม่</button>
                    </form>
                    <img src={img} className="img" width="300" height="430"></img>
                </div>
            </div>
        </div>
    );
}

export default Loginmember;