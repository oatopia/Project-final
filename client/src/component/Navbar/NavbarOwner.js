import React from "react";
import "./NavbarOwner.css";
import logoapp from "../../img/logoapp.png";
import profilelogo from "../../img/profile-user.png";
import add from '../../img/Add.png';
import edit from '../../img/edit.png';
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from "react-router-dom";
import Auth from '../../service/authService.js'


export default function Navbar() {
  const currentUser = Auth.getCurrentUser();
  const history = useHistory();
  const logout = () => {
    Auth.logout();
    history.push("/");
  }
  return (
    <div className="NavOwner-container">
      <img src={logoapp} className="logoapp" width="200" height="100"></img>
      <div className="NavOwner-container2">
        <Link to="/owner">
          <p className="home-menu">หน้าหลักผู้ประกอบการ</p>
        </Link>
        <div className="profile-NavOwner">
          <img src={profilelogo} className="profilelogo" width="35" height="36" ></img>
          <p>{currentUser.username}</p>
        </div>
        <button id="but-owner" onClick={logout}>ออกจากระบบ</button>
      </div>
    </div>
  );
}
