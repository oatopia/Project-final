import { React, useEffect, useState } from "react";
import "./Admin.css";
import Axios from "axios";
import NavbarAdmin from "./component/NavbarAdmin.js";
import deleteicon from "./img/deleteicon.png";

function Admin() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    Axios.get("/api/Admin/user", {})
      .then((Response) => {
        setUser(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="contnet-user-Admin">
      <NavbarAdmin></NavbarAdmin>
      <h1 className="h1-user-Admin">บัญชีผู้ใช้งาน</h1>
      <div className="content2-user-admin">
        {user.map((data) => {
          return (
            <div className="user-box-Admin">
              <label className="user-info">{data.user_id}</label>
              <label className="user-info">{data.username}</label>
              {/* <label className="user-info">{data.password}</label> */}
              <label className="user-info">{data.type}</label>
              <img src={deleteicon}></img>
            </div>
          );
        })}
      </div>
      <div className="clear"></div>
    </div>
  );
}

export default Admin;
