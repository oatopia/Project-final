import React, { useState } from "react";
import "./NavbarOwner.css";
import logoapp from "../../img/logo.png";
import profilelogo from "../../img/user1.png";
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from "react-router-dom";
import Auth from '../../service/authService.js'
import { DropdownButton, Dropdown } from 'react-bootstrap'


export default function Navbar() {
  const currentUser = Auth.getCurrentUser();
  const history = useHistory();
  const [ischeck, setIscheck] = useState(false);
  const [size,setSize] = useState('')
  const logout = () => {
    Auth.logout();
    history.push("/");
  }

  const adddiv = (e) => {
    setSize('100px')
  }
  return (
    <div className="NavOwner-container">
      <img src={logoapp} className="logoapp" width="200" height="100"></img>
      <div className="NavOwner-container2">
        <Link to="/owner">
          <p className="home-menu">หน้าหลักผู้ประกอบการ</p>
        </Link>

        <div className="profile-content">
        <img src={profilelogo} className="profilelogo" width="35" height="36" ></img>
          <DropdownButton menuAlign="right" id="dropdown-owner-page" title={currentUser.username}  >
              <Dropdown.Item className="dropdown-option-owner" onClick={logout}>ออกจากระบบ</Dropdown.Item>
          </DropdownButton>
        </div>
       
        {/* <div className="profile-container" onClick={adddiv}>
          <div className="profile-NavOwner" >
            <img src={profilelogo} className="profilelogo" width="35" height="36" ></img>
            <p>{currentUser.username}</p>
          </div>
           <div className="select-profile"  top={size} style={{top:{size}}}>
            <p>ออกจากระบบ</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
