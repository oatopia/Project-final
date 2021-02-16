import React from "react";
import "./NavbarMember.css";
import logoapp from "../img/logoapp.png";
import homelogo from "../img/Home.png";
import userlogo from "../img/user.png";
import { BrowserRouter, Route, Link, Router, Redirect } from "react-router-dom";

export default function Navbar() {
  const gotohome = () => {
    window.location.href = "/member";
  };
  return (
    <div className="Nav">
      <img
        src={logoapp}
        className="logoapp"
        width="200"
        height="100"
        onClick={gotohome}
      ></img>

      <ul className="listmenu">
        <img
          src={homelogo}
          className="homelogo"
          width="40"
          height="38"
          onClick={gotohome
          }></img>
        <Link to="/">
          <a>หน้าหลัก</a>
        </Link>{" "}
        <img src={userlogo} className="userlogo" width="40" height="38" onClick={()=>{
          window.location.href="/login"
        }}></img>
        <Link to="/login">
          <a>เข้าสู่ระบบ</a>
        </Link>
        <button
          className="sign"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          สมัครสมาชิก
        </button>
      </ul>
    </div>
  );
}
