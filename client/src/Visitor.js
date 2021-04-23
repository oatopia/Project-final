import React from 'react';
import './Visitor.css';
import Navbar from './component/Navbar';
import Match from './component/Match';
import backgroundvisitor from './img/background.jpg';

function Visitor() {
    
    return (
    <div className="appcontainer" >
      <Navbar></Navbar>
      <div className="searchbar-Visitor">
        <input className="searchinput-Visitor"></input> 
        <button className="searchbutton-Visitor">ค้นหา</button>
      </div>
      <Match/>
    </div>
    );
}

export default Visitor;