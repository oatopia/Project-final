import React from 'react';
import './Login.css';
import img from './img/loginimg.jpg'
import Navbar from './component/Navbar'

function Login() {
  return (
   <>
    <Navbar></Navbar>
    <div className="containerlog">
        
        <div className="container1">
            <form className="form2">
                <ul className="containerlist">
                    <h1 id="1">เข้าสู่ระบบ</h1>
                    <a>ชื่อผู้ใช้</a>
                    <input></input>
                    <br></br>
                    <a>รหัสผ่าน</a>
                    <input></input>
                    <br></br>
                    <button className="buttonregister">เข้าสู่ระบบ</button>
                </ul>
            </form>
        <img src={img} className="img" width="400" height="470"></img>
        </div>        
    </div>
   </>
  );
}

export default Login;