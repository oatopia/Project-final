import React from "react";
import "./Visitor.css";
import Navbar from "./component/Navbar";
import Match from "./component/Match";
import Showfactor from './component/showfactor.js'


function Visitor() {
  return (
    <div className="parrent-contain">
      <div className="appcontainer">
        <div className="sticky">
        <Navbar></Navbar>
        <div className="header-contain">
          <h1>Dorm Matching TU</h1>
          <h2>เว็บจับคู่หอพักที่จะช่วยให้คุณตัดสินใจเลือกหอพักได้ง่ายขึ้น</h2>
        </div>
        </div>
      </div>
      <div className="searchbar-Visitor">
        <input className="searchinput-Visitor" placeholder="ค้นหาหอพัก..."></input>
        <button className="searchbutton-Visitor">ค้นหา</button>
      </div>
      <div className="match-container">
        {/* <Match /> */}
        <Showfactor/>
        {/* <div className="image-match-container"></div> */}
      </div>
    </div>
  );
}

export default Visitor;
