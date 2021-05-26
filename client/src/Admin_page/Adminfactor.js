import { React, useEffect, useState } from "react";
import "./Adminfactor.css";
import Axios from "axios";
import NavbarAdmin from "../component/Navbar/NavbarAdmin.js";
import deleteicon from "../img/deleteicon.png";
import editicon from "../img/edit.png";
import addicon from "../img/plus 2.png";

function Adminfactor() {
  // const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const [factor, setFactor] = useState([]);
  const [showadd, setShowadd] = useState(false);
  const [textinput, setTextinput] = useState("");
  const [addfactortitle, setAddfactortitle] = useState("");
  const [addfactor, setAddfactor] = useState("");
  const [image, setImage] = useState("");
  const [editname, setEditname] = useState("");
  const [editTitle, setEditTitle] = useState("");
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
    formData.append("new_factortitle", addfactortitle);
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
        <div className="text-add-factor">
          <div className="text-factor-box">
            <h4>ชื่อปัจจัย</h4>
            <input
              className='text-factor-name'
              type="text"
              onChange={(e) => {
                setAddfactortitle(e.target.value);
              }}
            />
          </div>

          <div className="text-factor-box">
            <h4>รายละเอียด</h4>
            <input
              className='text-factor-name'
              type="text"
              onChange={(e) => {
                setAddfactor(e.target.value);
              }}
            // onChange={(e) => {
            //   setAddfactor(e.target.value);
            // }}
            />
          </div>

          <input
            type="file"
            className='file-factor-image'
            onChange={(e) => {
              setImage(e.target.files[0]);
              // console.log(e.target.files[0]);
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
          return val.factor_ID != id;
        })
      );
    });
  };

  const updatebyId = (id) => {

    const formData = new FormData();
    formData.append("EditImage", editimg);
    formData.append("EditName", editname);
    formData.append("EditTitle", editTitle);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.put(`api/Admin/updateFactor/${id}`, formData, config)
      .then((Response) => {
        let Data = Response.data
        setFactor(
          factor.map((item) => {
            return item.factor_ID == id ? { factor_ID: id, factor_Title: Data.factor_Title, factor_Name: Data.factor_Name, image_Factor: Data.image_Factor }
              : item;
          }));
        setTextinput("");
      });
  };

  return (
    <div className="content-factor-Admin">
      <NavbarAdmin />
      <h1 className="h1-factor-Admin">ปัจจัยในการตัดสินใจเลือกหอพัก</h1>
      <div className="content2-factor-Admin">
        <button
          className="add-factor-Admin"
          onClick={() => {
            setShowadd(true);
          }}
        >
          <img className='add-btn-adminfac' src={addicon} width='30px' height='30px'></img>
          เพิ่มปัจจัย
        </button>
        {showadd &&
          <div className="add-box">
            <div className="text-add-factor">
              <div className="text-factor-box">
                <h4>ชื่อปัจจัย</h4>
                <input
                  className='text-factor-name'
                  type="text"
                  onChange={(e) => {
                    setAddfactortitle(e.target.value);
                  }}
                />
              </div>

              <div className="text-factor-box">
                <h4>รายละเอียด</h4>
                <input
                  className='text-factor-name'
                  type="text"
                  onChange={(e) => {
                    setAddfactor(e.target.value);
                  }}
                />
              </div>

              <input
                type="file"
                className='file-factor-image'
                onChange={(e) => {
                  setImage(e.target.files[0]);
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
          </div>}
        {factor.map((data) => {
          return (
            <div className="factor-box-Admin">
              <div className="factor-inner-box-Admin">
                <h1 className="factor-info">{data.factor_ID}</h1>
                {textinput == data.factor_ID ? (
                  <div>
                    <input
                    type="text"
                    className="factor-info"
                    id="edit-input"
                    defaultValue={data.factor_Title}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="factor-info"
                    id="edit-input"
                    defaultValue={data.factor_Name}
                    onChange={(e) => {
                      setEditname(e.target.value);
                    }}
                  />
                  </div>
                ) : (
                  <div>
                    <h1 className="factor-info" id="fname">
                      {data.factor_Title}
                    </h1>
                    <h2 className="factor-info" id="fname">
                      {data.factor_Name}
                    </h2>
                  </div>
                )}

                {textinput == data.factor_ID ? (
                  <div className="edit-mini-box">
                    <input type="file"
                      className="edit-image"
                      onChange={(e) => { setEditimg(e.target.files[0]) }}
                    ></input>

                    <button
                      className="save-edit-button"
                      onClick={() => {
                        updatebyId(data.factor_ID);
                      }}
                    >
                      บันทึกการแก้ไข
                    </button>
                  </div>
                ) : (
                  <img
                    src={"images/" + data.image_Factor}
                    width="60px"
                    height="60px"
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
                    setTextinput(data.factor_ID);
                  }}
                ></img>
                <img
                  src={deleteicon}
                  className="icon-factor-Admin"
                  width="40px"
                  height="40px"
                  onClick={() => {
                    deleteFactor(data.factor_ID);
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
