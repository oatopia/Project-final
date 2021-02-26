import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import './Login.css';
import img from './img/loginimg.jpg'
import Navbar from './component/Navbar'
import Axios from 'axios'

const Login = ()=> {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [type,settype] = useState("");
    const login = () =>{
        Axios.post('api/user/login',{
            username: username,
            password: password
        }).then( Response =>{
            // console.log(res);
            if(Response.data == "สมาชิก"){
                return window.location.href="/member";
            }else{
                return window.location.href="/owner";
            }
        })
    }
    // if(type == " สมาชิก"){
    //     return window.location.href="/member",settype("");
    // }else{
    //     return window.location.href="/owner",settype("");
    // }

  return (
   <>
    <Navbar></Navbar>
    <div className="containerlog">
        
        <div className="container1">
            <form className="form2">
                <ul className="containerlist">
                    <h1 id="1">เข้าสู่ระบบ</h1>
                    <a>ชื่อผู้ใช้</a>
                    <input onChange={(e)=>{
                             setusername(e.target.value);
                         }}></input>
                    <br></br>
                    <a>รหัสผ่าน</a>
                    <input onChange={(e)=>{
                             setpassword(e.target.value);
                         }}></input>
                    <br></br>
                    <button className="buttonregister" onClick={login}>เข้าสู่ระบบ</button>
                </ul>
            </form>
        <img src={img} className="img" width="400" height="470"></img>
        </div>        
    </div>
   </>
  );
}

export default Login;