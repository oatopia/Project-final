import {React,useEffect,useState} from 'react';
import './resultmatch.css';
import Navbar from './component/Navbar.js';
import Axios from 'axios' 
import { useLocation } from 'react-router';


function VisitorResult() {
  var location = useLocation();
  const state = location.state;
  console.log("sate match:",state);

return (
    <div className="contain-visitor-result">
      <Navbar></Navbar>
      <div className="content-visitor-result">
        {state.map((data)=>{
          return(
            <div className="visitor-dorm-block">
              <label>{data.Dorm_Name}</label>
            </div>
          )}
        )}
      </div>
    </div>
    );
}

export default VisitorResult;