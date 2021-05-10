import React, { useState } from "react";
import "./Visitor.css";
import Navbar from "./component/Navbar";
import Match from "./component/Match";
import Showfactor from './component/showfactor.js'

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Visitor() {
  const [search,setSearch] = useState("");
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
          <input className="searchinput-Visitor" placeholder="ค้นหาหอพัก..." validations={[required]}></input>
          <button className="searchbutton-Visitor">ค้นหา</button>
      </div>
      <div className="match-container">
        {/* <Match /> */}
        <Showfactor />
        {/* <div className="image-match-container"></div> */}
      </div>
    </div>
  );
}

export default Visitor;
