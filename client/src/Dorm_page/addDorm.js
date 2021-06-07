import React from "react";
import "./addDorm.css";
import Navbar from "../component/Navbar/NavbarOwner.js";
import Auth from "../service/authService.js";
import { Redirect} from "react-router-dom";
import Indorm from "../component/Dorm/Indorm.js";

const Adddorm = () => {
  const currentUser = Auth.getCurrentUser();
  if (!currentUser) {
    return <Redirect to="/loginowner" />;
  }

  return (
    <div className="owner-container">
      <Navbar />
      <Indorm/>
    </div>
  );
};

export default Adddorm;
