import React, { useState } from "react";
import "./Visitor.css";
import Navbar from "../component/Navbar";
import Match from "../component/Match";
import Showfactor from '../component/showfactor.js'
import { useHistory } from "react-router";
import Axios from "axios";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

function Visitor() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/";
  const [search,setSearch] = useState("");
  const history = useHistory();

  const onClickforSerach = (e) => {
    console.log(search)
    Axios.post(url+'api/visitor/searchDorm',{
      dormname:search
    },)
    .then(Response => {
        console.log("Respone search: ",Response.data);
          history.push({
            pathname: "/searchvisitor",
            state: Response.data,
          });
        
    }).catch(error=>{
        console.log(error);
    })
  }
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
          <input className="searchinput-Visitor" placeholder="ค้นหาหอพัก..." onChange={e=>{setSearch(e.target.value)}}></input>
          <button className="searchbutton-Visitor" onClick={()=>{onClickforSerach()}}>ค้นหา</button>
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
