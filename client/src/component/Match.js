import {React,useState} from "react";
import Axios from 'axios'
import './Match.css';
import D1 from '../img/icon/D1.png'



export default function Match(){
    
    const [factorlist,setFactorlist] = useState([]);
    const [imagesrc,setImageSrc] = useState([]);
    Axios.get('/api/match/getfactor',{timeout: 100
    }).then( Response =>{
        setFactorlist(Response.data);
        setImageSrc(Response.data.Image_factor);
    })
    return(
    <div className="containermatch"> 
        <div >
            <h1 id="header2" >โปรดให้คะแนนระดับความสำคัญของปัจจัย ดังต่อไปนี้</h1>
                {factorlist.map((val,key)=>{
                    return(
                     <div>
                         <p>{val.Factor_name}</p>
                         <p>{val.Image_factor}</p>
                         <img src={val.Image_factor}></img>
                     </div>   
                    )
                })}
        </div>
        
    </div>
    );
}