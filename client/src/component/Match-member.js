import {React,useEffect,useState} from "react";
import Axios from 'axios'
import './Match.css';
import D1 from '../img/icon/D1.png'



export default function Match(){
    const [factorlist,setFactorlist] = useState([]);
    const [weight,setWeight] = useState({
        image:"",
        weight:""
    });

    Axios.get('/api/match/getfactor',{timeout: 100
    }).then(Response=>{
        setFactorlist(Response.data);
    })

    const showimage = () =>{
        let array = [];
        for (let i = 0; i < factorlist.length; i++) {
            for (let j = i+1; j < factorlist.length; j++) {
                array.push(<img value={factorlist[i].Image_factor} src={('http://localhost:4000/images/'+factorlist[i].Image_factor)} width="100" height="100"
                onClick={(e)=>{setWeight([...weight,e.target.value]}}></img>);
                array.push(<img src={('http://localhost:4000/images/'+factorlist[j].Image_factor)} width="100" height="100"></img>);
                array.push(
                    <select classname="select-score">
                        <option selected  value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                );   
            }
            
        }
        return array;
    }

    return(
    <div className="containermatch"> 
        <div >
            <h1 id="header2" >โปรดให้คะแนนระดับความสำคัญของปัจจัย ดังต่อไปนี้</h1>

            <div className="containermatch-2">
                {factorlist.map(data=>{
                    return(
                        <div>
                            <img src={('http://localhost:4000/images/'+data.Image_factor)} width="100" height="100"></img>
                            <p>มีความหมายว่า {data.Factor_name}</p>
                        </div>
                    )
                })}
            </div>
            <div className="containermatch-3">
                {showimage()}
            </div>
            <button>บันทึก</button>
            <button>จับคู่หอพัก</button>
            
        </div>
        
    </div>
    );
}