import React from "react";
import "./NavbarOwner.css";
import logoapp from "../img/logoapp.png";
import profilelogo from "../img/profile-user.png";

export default function Navbar() {
  const logout = () =>{
    window.location.href = "/";
  }
  return (
    <div className="NavOwner-container">
            <img src={logoapp} className="logoapp" width="200" height="100"></img>
            <div className="NavOwner-container2">
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
