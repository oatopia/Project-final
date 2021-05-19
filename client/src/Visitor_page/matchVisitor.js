import { React, useEffect, useState } from 'react';
import './matchVisitor.css';
import Navbar from '../component/Navbar/Navbar.js';
import Axios from 'axios'
import { useHistory, useLocation } from 'react-router';
import imagetest from '../img/livingroom1.jpg'

function MatchVisitor(){
    let history = useHistory(); 
    let location = useLocation();
    let payload = location.state;
    console.log("payload in matchvisitor",payload)
    return(
        <div>
            <Navbar/>
            <div className="result-container">
                {payload.map((data,key)=>{
                    return(
                        <div className="dorm-container" key={key} onClick={()=>{
                            history.push({
                                pathname: "/dormvisitor",
                                state: data,
                              })
                        }
                            
                        }>
                            <h1>{data.dorm_Name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MatchVisitor;