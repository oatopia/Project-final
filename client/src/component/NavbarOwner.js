import React from "react";
import "./NavbarOwner.css";
import logoapp from "../img/logoapp.png";
import profilelogo from "../img/profile-user.png";
import homelogo from '../img/Home.png';
import add from '../img/Add.png';
import edit from '../img/edit.png';
import { BrowserRouter, Route, Link, Router, Redirect } from "react-router-dom";


export default function Navbar() {
  const logout = () => {
    window.location.href = "/";
  }
  return (
    <div className="NavOwner-container">
      <img src={logoapp} className="logoapp" width="200" height="100"></img>
      <div className="NavOwner-container2">
        <img src={homelogo} className="homelogo" width="50" height="28"></img>
        <Link>หน้าหลัก</Link>
        <img src={add} className="add" width="50" height="28"></img>
        <Link>เพิ่มข้อมูลหอพัก</Link>
        <img src={edit} className="edit" width="50" height="28"></img>
        <Link>แก้ไขข้อมูลหอพัก</Link>
        <div className="profile-NavOwner" onClick={logout}>
          <img src={profilelogo} className="profilelogo" width="35" height="36" ></img>
          <p>Kanchana</p>
        </div>
        <button id="but-owner" onClick={logout}>Log out
                </button>
      </div>
    </div>
  );
}
