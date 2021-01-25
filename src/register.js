import React from 'react';
import './register.css';
import img from './img/registerimg.png'
import Navbar from './component/Navbar'

function register() {
  return (
   <>
    <Navbar></Navbar>
    <div className="container">
        
        <div className="container1">
            <ul className="containerlist">
                <h1>สมัครสมาชิก</h1>
                <a>ชื่อผู้ใช้</a>
                <input></input>
                <br></br>
                <a>รหัส</a>
                <input></input>
                <br></br>
                <a>อีเมล</a>
                <input></input>
                <br></br>
                <a>ประเภทผู้ใช้งาน</a>
                <br></br>
                
                <button className="buttonregister">สมัครสมาชิก</button>
            </ul>
        <img src={img} className="img" width="400" height="470"></img>
        </div>        
    </div>
   </>
  );
}

export default register;