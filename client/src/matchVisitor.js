import { React, useEffect, useState } from 'react';
import './visitorResult.css';
import Navbar from './component/Navbar.js';
import Axios from 'axios'
import { useLocation } from 'react-router';
import imagetest from './img/livingroom1.jpg'

function MatchVisitor(){
    let location = useLocation();
    let payload = location.state;
    console.log("payload in matchvisitor",payload)
    return(
        <div>
            <Navbar/>
        </div>
    )
}

export default MatchVisitor;