import React from 'react';
import './Visitor.css';
import Navbar from './component/Navbar';
import Match from './component/Match';
import backgroundvisitor from './img/background.jpg';

function Visitor() {
    
    return (
    <div className="appcontainer" style={{backgroundImage: `url(${backgroundvisitor})`}}>
      <Navbar></Navbar>
      <div className="searchbar">
        <input className="searchinput"></input> 
        <button className="searchbutton">ค้นหา</button>
      </div>
      <Match/>
    </div>
    );
}

export default Visitor;