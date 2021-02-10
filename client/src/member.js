import React from 'react';
import './member.css';
import Navbar from './component/Navbar';
import Match from './component/Match';


function Member() {
    
    return (
    <div className="appcontainer-member">
      <Navbar></Navbar>
      <div className="searchbar-member">
        <input className="searchinput-member"></input> 
        <button className="searchbutton-member">ค้นหา</button>
      </div>
      <Match/>
    </div>
    );
}

export default Member;