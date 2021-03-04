import './register.css';
import img from './img/registerimg.png'
import Navbar from './component/Navbar'
import Axios from 'axios'
import React,{useState} from 'react';


function Register() {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [type,settype] = useState("สมาชิก");

    const addinfo = (e) =>{
        e.preventDefault();
        Axios.post('api/user/register',{
            username: username,
            password: password,
            type: type
        }).then(()=>{
            console.log("sucess");
        })
    }
    return(
        <>
            <Navbar></Navbar>
             <div className="container">
                 <div className="container1">
                 <form className = "form1" action="" method="">
                     <ul className="containerlist">
                         <h1 id="3">สมัครสมาชิก</h1>
                         <p>ชื่อผู้ใช้</p>
                         <input onChange={(e)=>{
                             setusername(e.target.value);
                         }}></input>
                         <br></br>
                         <p>รหัสผ่าน</p>
                         <input onChange={(e)=>{
                             setpassword(e.target.value);
                         }} ></input>
                         <br></br>
                         <p>ประเภทผู้ใช้งาน</p>
                         <select classname="type" onChange={(e)=>{
                             settype(e.target.value);
                         }}>
                             <option selected  value="สมาชิก">สมาชิก</option>
                             <option value="ผู้ประกอบการ">ผู้ประกอบการ</option>
                         </select>
                         <br/><br/>
                         <button className="buttonregister" onClick={addinfo}>สมัครสมาชิก</button>
                         <br/><br/>
                         
                     </ul>
                 </form> 
                 <img src={img} className="img" width="400" height="500"></img>
                 </div>
                        
             </div>
            </>
    );    
}






export default Register;