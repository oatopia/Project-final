import { React, useEffect, useState } from "react";
import "./Adminfactor.css";
import Axios from "axios";
import NavbarAdmin from "./component/NavbarAdmin.js";
import deleteicon from "./img/deleteicon.png";

function Adminfactor() {
  const [factor, setFactor] = useState([]);
  const [showadd, setShowadd] = useState(false);
  const [addfactor, setAddfactor] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    Axios.get("/api/Admin/factor")
      .then((Response) => {
        setFactor(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const saveFactor = () => {
    const formData = new FormData();
    formData.append('myImage',image);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };
    Axios.post("/api/Admin/saveFactor",formData,config)
      .then((Response) => {
        console.log(Response);
        setShowadd(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const comAdd = () => {
    return (
      <div className="add-box">
        <h2>เพิ่มปัจจัยในการตัดสินใจเลือกหอพัก</h2>
        <input
          type="text"
          onChange={(e) => {
            setAddfactor(e.target.value);
          }}
        ></input>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        ></input>
        <button onClick={saveFactor()}>บันทึกปัจจัย</button>
      </div>
    );
  };

  return (
    <div className="content-factor-Admin">
      <NavbarAdmin></NavbarAdmin>
      <h1 className="h1-factor-Admin">ปัจจัยในการตัดสินใจเลือกหอพัก</h1>
      <div className="content2-factor-Admin">
        <button
          className="add-factor-Admin"
          onClick={() => {
            setShowadd(true);
          }}
        >
          เพิ่มปัจจัย
        </button>
        {showadd ? comAdd() : null}
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
