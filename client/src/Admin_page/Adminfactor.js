import { React, useEffect, useState } from "react";
import "./Adminfactor.css";
import Axios from "axios";
import NavbarAdmin from "../component/Navbar/NavbarAdmin.js";
import deleteicon from "../img/deleteicon.png";
import editicon from "../img/edit.png";

function Adminfactor() {
  // const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const [factor, setFactor] = useState([]);
  const [showadd, setShowadd] = useState(false);
  const [textinput, setTextinput] = useState("");
  const [addfactor, setAddfactor] = useState("");
  const [image, setImage] = useState("");
  const [editname, setEditname] = useState("");
  const [editimg, setEditimg] = useState("");

  useEffect(() => {
    Axios.get("api/Admin/factor")
      .then((Response) => {
        setFactor(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const saveFactor = () => {
    const formData = new FormData();
    formData.append("ImageFactor", image);
    formData.append("new_factor", addfactor);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post("api/Admin/saveFactor", formData, config)
      .then((Response) => {
        console.log(Response);
        setShowadd(false);
        setFactor([...factor, Response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ComAdd = () => {
    return (
      <div className="add-box">
        <div>
          <input
            className='text-factor-name'
            type="text"
            onChange={(e) => {
              setAddfactor(e.target.value);
            }}
          ></input>
          <input
            type="file"
            className='file-factor-image'
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          ></input>
        </div>

        <button
        className='btn-save-factor'
          onClick={() => {
            saveFactor();
          }}
        >
          บันทึกปัจจัย
        </button>
      </div>
    );
  };

  const deleteFactor = (id) => {
    console.log("ID:", id);
    Axios.delete(`api/Admin/factorDelete/${id}`).then((Response) => {
      setFactor(
        factor.filter((val) => {
          return val.Id != id;
        })
      );
    });
  };

  const updatebyId = (id) => {

    const formData = new FormData();
    formData.append("EditImage", editimg);
    formData.append("EditName", editname);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.put(`api/Admin/updateFactor/${id}`, formData, config)
      .then((Response) => {
        setFactor(
          factor.map((item) => {
            return item.Id == id ? { Id: id, Factor_name: Response.data.Factor_name, Image_factor: Response.data.Image_factor }
              : item;
          }));
        setTextinput("");
      });
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
        {showadd ? <ComAdd /> : null}
        {factor.map((data) => {
          return (
            <div className="factor-box-Admin">
              <div className="factor-inner-box-Admin">
                <label className="factor-info">{data.factor_ID}</label>
                {textinput == data.factor_ID ? (
                  <input
                    type="text"
                    className="factor-info"
                    id="edit-input"
                    onChange={(e) => {
                      setEditname(e.target.value);
                    }}
                  ></input>
                ) : (
                  <label className="factor-info" id="fname">
                    {data.factor_Name}
                  </label>
                )}

                {textinput == data.Id ? (
                  <div className="edit-mini-box">
                    <input type="file"
                      className="edit-image"
                      onChange={(e) => { setEditimg(e.target.files[0]) }}
                    ></input>
                    <button
                      className="save-edit-button"
                      onClick={() => {
                        updatebyId(data.Id);
                      }}
                    >
                      save
                    </button>
                  </div>
                ) : (
                  <img
                    src={"images/" + data.image_Factor}
                    width="50px"
                    height="50px"
                  ></img>
                )}
              </div>
              <div className="factor-icon-box-Admin">
                <img
                  src={editicon}
                  className="icon-factor-Admin"
                  width="40px"
                  height="40px"
                  onClick={() => {
                    setTextinput(data.Id);
                  }}
                ></img>
                <img
                  src={deleteicon}
                  className="icon-factor-Admin"
                  width="40px"
                  height="40px"
                  onClick={() => {
                    deleteFactor(data.Id);
                  }}
                ></img>
              </div>
            </div>
          );
        })}
      </div>
      <div className="clear-factor-Admin"></div>
    </div>
  );
}

export default Adminfactor;
