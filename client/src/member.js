import React from 'react';
import './member.css';
import NavbarMember from './component/NavbarMember.js';
import Match_member from './component/Match-member';


function Member() {
    
    return (
    <div className="appcontainer-member">
      <NavbarMember></NavbarMember>
      <div className="searchbar-member">
        <input className="searchinput-member"></input> 
        <button className="searchbutton-member">ค้นหา</button>
      </div>
      <Match_member/>
    </div>
    );
}

export default Member;