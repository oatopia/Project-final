import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Login.css';
import img from './img/loginimg.jpg'
import Navbar from './component/Navbar'
import Axios from 'axios'

const Login = ()=> {
    
    var history = useHistory();
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [type,settype] = useState("");
    const login = (e) =>{
        e.preventDefault();
        Axios.post('/api/user/login',{
            username: username,
            password: password
        }).then( Response =>{
            if(Response.data.type == "สมาชิก"){
                history.push("/member");
            }else{
                history.push("/owner");
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
                    <p>ชื่อผู้ใช้</p>
                    <input onChange={(e)=>{
                             setusername(e.target.value);
                         }}></input>
                    <br></br>
                    <p>รหัสผ่าน</p>
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