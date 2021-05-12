import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import img from './img/loginimg.jpg'
import Navbar from './component/Navbar'
import Axios from 'axios'
import Auth from './service/authService.js'


const Login = () => {

    var history = useHistory();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        Auth.login(username, password)
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
            <div className="containerlog">
                <div className="container1">
                    <form className="form2" onSubmit={handleLogin}>
                        <h1 id="head-login">เข้าสู่ระบบ</h1>
                        <p>ชื่อผู้ใช้</p>
                        <input className="text-input" onChange={(e) => {
                            setusername(e.target.value);
                        }}></input>
                        <p>รหัสผ่าน</p>
                        <input className="text-input" onChange={(e) => {
                            setpassword(e.target.value);
                        }}></input>
                        <br></br>
                        <button className="buttonregister" type="submit">เข้าสู่ระบบ</button>
                        <hr/>
                        <button className="buttonregister2" type="submit">สร้างบัญชีใหม่</button>
                    </form>
                    <img src={img} className="img" width="300" height="470"></img>
                </div>
            </div>
        </>
    );
}

export default Login;