import React from "react";
import "./Navbar.css";
import logoapp from "../img/logo.png";
import homelogo from "../img/Home.png";
import userlogo from "../img/user.png";
import { BrowserRouter, Route, Link, Router, Redirect } from "react-router-dom";

export default function Navbar() {
  const gotohome = () => {
    window.location.href = "/";
  };
  return (
    <div className="Nav">
      <div className="logo-box">
        <img
          src={logoapp}
          className="logoapp"
          onClick={gotohome}
        ></img>
      </div>
      <ul className="listmenu">
        {/* <img
          src={homelogo}
          className="homelogo"
          width="33px"
          height="31px"
          onClick={gotohome}
        ></img> */}
        <Link to="/" className="linkhead">
          <p>หน้าหลัก</p>
        </Link>
        {/* <img
          src={userlogo}
          className="userlogo"
          width="33px"
          height="32px"
          onClick={() => {
            window.location.href = "/login";
          }}
        ></img> */}
        <Link to="/login" className="linkhead">
          <p>เข้าสู่ระบบ</p>
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
