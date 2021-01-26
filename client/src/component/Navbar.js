import React from "react";
import './Navbar.css';
import logoapp from '../img/logoapp.png'
import homelogo from '../img/Home.png'
import userlogo from '../img/user.png'

export default function Navbar(){

    return(
        <div className="Nav">
            
            <img src={logoapp} className="logoapp" width="200" height="100"></img>
            
            <ul className="listmenu">
                    <img src={homelogo} className="homelogo" width="40" height="38"></img>
                    <a>หน้าหลัก</a>

                    <img src={userlogo} className="userlogo" width="40" height="38"></img>
                    <a>เข้าสู่ระบบ</a>
                    <button className="sign">สมัครสมาชิก</button>
            </ul>
            
        </div>
    );
}