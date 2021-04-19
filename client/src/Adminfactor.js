import { React, useEffect, useState } from "react";
import "./Adminfactor.css";
import Axios from "axios";
import NavbarAdmin from "./component/NavbarAdmin.js";
import deleteicon from "./img/deleteicon.png";

function Adminfactor() {
  const [factor, setFactor] = useState([]);

  useEffect(() => {
    Axios.get("/api/Admin/factor")
      .then((Response) => {
        setFactor(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    // const deletefactor = (id)=>{
    //    Axios.delete("/api/Admin/facdelete",id)
    //     .then((Response)=>{
    //         setFactor(factor.filter((val)=>{
    //             return val.Id != id;
    //         }))
    //     })
    // } 

  return (
    <div className="content-factor-Admin">
      <NavbarAdmin></NavbarAdmin>
      <h1 className="h1-factor-Admin">ปัจจัยในการตัดสินใจเลือกหอพัก</h1>
      <div className="content2-factor-Admin">
          <button className="add-factor-Admin">เพิ่มปัจจัย</button>
        {factor.map((data) => {
          return (
            <div className="factor-box-Admin">
              <label className="factor-info">{data.Id}</label>
              <label className="factor-info">{data.Factor_name}</label>
              {/* <img src={deleteicon} className="deleteicon-factor-Admin" onClick={deletefactor(data.Id)}></img> */}
            </div>
          );
        })}
      </div>
      <div className="clear-factor-Admin"></div>
    </div>
  );
}

export default Adminfactor;
