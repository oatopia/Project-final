import React from 'react';
import './member.css';
import NavbarMember from './component/NavbarMember.js';
import Match from './component/Match';


function Member() {
    
    return (
    <div className="appcontainer-member">
      <NavbarMember></NavbarMember>
      <div className="searchbar-member">
        <input className="searchinput-member"></input> 
        <button className="searchbutton-member">ค้นหา</button>
      </div>
      <Match/>
    </div>
    );
}

export default Member;