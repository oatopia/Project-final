import React, { useEffect, useState } from "react";
import "./Dorm_data.css";
import Navbar from "../component/Navbar/NavbarOwner.js";
import Axios from "axios";
import backgroundimg from "../img/operatorbackground.jpg";
import Auth from "../service/authService.js";
import { Redirect, useHistory } from "react-router-dom";
import authHeader from "../service/auth-header.js";
import { useLocation } from "react-router";
import Dorminfo from "../component/Dorm/Dorm_info.js";
import DeleteIcon from '../img/deleteicon.png'
import axios from "axios";

const Owner = () => {
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  //  -------------------------------------------------------
  const facilitiesinsidedorm = [
    "เครื่องปรับอากาศ",
    "เครื่องทำน้ำอุ่น",
    "ตู้เสื้อผ้า",
    "โซฟา",
    "โต๊ะ",
    "เก้าอี้",
    "อ่างล้างจาน",
    "โทรทัศน์",
    "เตียงเดี่ยว",
    "เตียงคู่",
    "ตู้เย็น",
    "ไมโครเวฟ",
    "อินเตอร์เน็ตไร้สาย",
    "โทรศัพท์สายตรง",
    "ตู้เก็บของ",
  ];
  const facilitiescenter = [
    "ลิฟท์",
    "ที่จอดรถ",
    "อินเตอร์เน็ตภายในอาคาร",
    "กล้องวงจรปิด",
    "ระบบรักษาความปลอดภัยแบบ Keycard",
    "ระบบรักษาความปลอดภัยแบบแสกนลายนิ้วมือ",
    "สระว่ายน้ำ",
    "ร้านซักรีด",
    "เครื่องซักผ้า",
    "ตู้น้ำหยอดเหรียญ",
    "ร้านอาหาร",
    "ร้านสะดวกซื้อ",
    "ห้องอ่านหนังสือ",
    "ฟิตเนท",
    "ร้านเสริมสวย",
    "รถตู้รับส่ง",
  ];
  // ---------------------------------------------------------------------

  const [dorm, setDorm] = useState([]);
  const [fac, setFac] = useState([]);
  const [img, setImg] = useState([]);
  const currentUser = Auth.getCurrentUser();
  const history = useHistory();
  const location = useLocation();
  const dorm_ID = location.state;
  const [showedit, setShowedit] = useState(false);
  let arrayFile = [];

  useEffect(() => {
    Axios.post(
      "api/dorm/getDormdatabyId",
      { dorm_ID: dorm_ID },
      { headers: authHeader() }
    ).then((Response) => {
      console.log("Response dorm: ", Response.data);
      setDorm(Response.data[0]);
    });

    Axios.post(
      "api/dorm/getFac",
      { dorm_ID: dorm_ID },
      { headers: authHeader() }
    ).then((Response) => {
      console.log("Response fac: ", Response.data);
      setFac(Response.data);
    });

    Axios.post(
      "api/dorm/getImg",
      { dorm_ID: dorm_ID },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Response image: ", Response.data);
        setImg(Response.data);
      })
      .catch((error) => {
        console.log("Error from get Factor", error);
      });
  }, []);


  const Onchangefac = (type) => (e) => {
    let checkvalue = false;
    let id = 0
    fac.map((item, key) => {
      if (e.target.value == item.facility) {
        checkvalue = true;
        id = item.factor_ID
      }
    });
    if (checkvalue == true) {
      Axios.delete(
        `api/dorm/facdeleteDelete/${id}`
      ).then((Response) => {
        setFac(
          fac.filter((item) => {
            return item.factor_ID != id;
          })
        );
      });
    } else {

      if (type == "ภายในห้องพัก") {

        const facil = {
          dorm_ID: dorm.dorm_ID,
          type_F: "ภายในห้องพัก",
          facility: e.target.value,
        };
        Axios.post("api/dorm/addfacil", facil, {
          headers: authHeader(),
        }).then((Response) => {
          setFac([
            ...fac,
            {
              factor_ID: Response.data.insertId,
              dorm_ID: dorm.dorm_ID,
              type_F: "ภายในห้องพัก",
              facility: e.target.value,
            },
          ]);
        });

      } else {

        const facil = {
          dorm_ID: dorm.dorm_ID,
          type_F: "ส่วนกลาง",
          facility: e.target.value,
        };
        Axios.post("api/dorm/addfacil", facil, {
          headers: authHeader(),
        }).then((Response) => {
          setFac([
            ...fac,
            {
              factor_ID: Response.data.insertId,
              dorm_ID: dorm.dorm_ID,
              type_F: "ส่วนกลาง",
              facility: e.target.value,
            },
          ]);
        });

      }


    }

  }

  const OnclickImage = (id, imagename) => (e) => {
    Axios.delete(
      `api/dorm/Imagedelete/${id}`, { data: { image: imagename } }
    ).then((Response) => {
      setImg(
        img.filter((item) => {
          return item.image_ID != id;
        })
      );
    });
  }


  const OnchangeImage = (e) => {
    let len = e.target.files.length;
    let formdata = new FormData();
    console.log("length file:", len);
    for (let i = 0; i < len; i++) {
      console.log("round ", i, " ", e.target.files[i]);
      formdata.append("Image", e.target.files[i]);
    }
    formdata.append("dorm_ID", dorm.dorm_ID);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post("api/dorm/createImage", formdata, config).then((Response) => {
      console.log(Response);
    });
  }

  if (!currentUser) {
    return <Redirect to="/loginowner" />;
  }

  const EditDorm = (e) => {
    let id = dorm.dorm_ID;
    axios.put(`api/dorm/UpdateDorm/${id}`, dorm)
      .then((Response) => {
        setShowedit(false);
      })

  }


  return (
    <div className="dormdata-container">
      <Navbar />
      <div className="content-dorm-container">
      <div className="box-dorm-data">
        {/* ---------------------------------------------------------------------- */}
        {showedit == false ? (
          <div className="box-info">
            <h1>{dorm.dorm_Name}</h1>

            <div className="image-container">
              {img.map((pic, key) => {
                return (
                  <img
                    key={key}
                    className="img-dorm-data"
                    src={"img_Dorm/" + pic.image}
                  />
                );
              })}
            </div>
            <div className="box-inner-data">
              <div>
                <p className="text-dorm-content"><label>ประเภทหอพัก</label> {dorm.type_D}</p>
              </div>

              <p className="text-dorm-content"><label>ที่อยู่</label> {dorm.address}</p>
              <h2>รายละเอียดค่าใช้จ่าย</h2>
              <p className="text-dorm-content"><h3>ค่าส่วนกลาง</h3> {dorm.deposit} บาท</p>
              <p className="text-dorm-content"><h3>ค่าไฟ </h3>{dorm.electric_Bill} บาทต่อยูนิต</p>
              <p className="text-dorm-content"><h3>ค่าน้ำ</h3> {dorm.water_Bill} บาทต่อยูนิต</p>
              <p className="text-dorm-content"><h3>ค่าประกัน</h3> {dorm.common_Fee} บาท</p>
            </div>
            <h2 id="faci">สิ่งอำนวยความสะดวก</h2>
            <div className="box-fac-data">
              <div className="fac-in-room">
                <h3>ภายในห้องพัก</h3>
                <ul>
                  {fac.map((fa, index) => {
                    if (fa.type_F == "ภายในห้องพัก")
                      return <li key={index}>{fa.facility}</li>;
                  })}
                </ul>
              </div>

              <div className="fac-central">
                <h3>ส่วนกลาง</h3>
                <ul>
                  {fac.map((fa, index) => {
                    if (fa.type_F == "ส่วนกลาง")
                      return <li key={index}>{fa.facility}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="box-2-inner-data">
              <p className="text-dorm-content"><h3>รายละเอียดหอพัก</h3> {dorm.detail}</p>
              <h2 id="contact">ข้อมูลติดต่อ</h2>
              <p className="text-dorm-content"><h3>ชื่อผู้ดูแลหอพัก</h3> {dorm.ad_Name}</p>
              <p className="text-dorm-content"><h3>เบอร์ติดต่อ</h3> {dorm.contact_Number}</p>
              <p className="text-dorm-content"><h3>อีเมล </h3>{dorm.e_Mail}</p>
              <p className="text-dorm-content"><h3>Line ID</h3> {dorm.line_ID}</p>
            </div>
          </div>
        ) : (
          <div className="box-info">
            <form>
              <h1 className="Edit-heading">แก้ไขข้อมูลหอพัก</h1>
              <h2>ชื่อหอพัก</h2>
              <input
                className="chong-one"
                defaultValue={dorm.dorm_Name}
                onChange={(e) => {
                  setDorm(prev=>({
                    ...prev,
                    dorm_Name:e.target.value
                  }))
                }}
              ></input>
              <br />
              <h2>ประเภทหอพัก</h2>
              <select
                className="type-dorm"
                defaultValue={dorm.type_D}
                onChange={(e) => {
                  setDorm(prev=>({
                    ...prev,
                    type_D:e.target.value
                  }))
                }}
              >
                <option value="หอพักแยกชาย-หญิง">หอพักแยกชาย-หญิง</option>
                <option value="หอพักรวม">หอพักรวม</option>
              </select>
              <br />
              <h2>ที่อยู่หอพัก</h2>
              <textarea
                className="chong-address"
                defaultValue={dorm.address}
                onChange={(e) => {
                  setDorm(prev=>({
                    ...prev,
                    address:e.target.value
                  }))
                }}
              ></textarea>
              <br />
              <h2>รายละเอียดค่าใช้จ่าย</h2>
              <ul>
                <h4 className="pay" id="p1">
                  เงินมัดจำ/ประกัน
                </h4>
                <input
                  className="chong-pay"
                  defaultValue={dorm.deposit}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      deposit:e.target.value
                    }))
                  }}
                ></input>
                <h4 className="baht">บาท</h4>
                <br />
                <h4 className="pay" id="p2">
                  อัตราค่าน้ำ
                </h4>
                <input
                  className="chong-pay"
                  defaultValue={dorm.water_Bill}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      electric_Bill:e.target.value
                    }))
                  }}
                ></input>
                <h4 className="baht">บาท</h4>
                <br />
                <h4 className="pay" id="p3">
                  อัตราค่าไฟ
                </h4>
                <input
                  className="chong-pay"
                  defaultValue={dorm.electric_Bill}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      water_Bill:e.target.value
                    }))
                  }}
                ></input>
                <h4 className="baht">บาท</h4>
                <br />
                <h4 className="pay" id="p4">
                  ค่าส่วนกลาง
                </h4>
                <input
                  className="chong-pay"
                  defaultValue={dorm.common_Fee}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      common_Fee:e.target.value
                    }))
                  }}
                ></input>
                <h4 className="baht">บาท</h4>
              </ul>
              <br />
              <h2>สิ่งอำนวยความสะดวก</h2>
              <div className="facilities">
                <div className="facilities-inside">
                  <h4 className="space">ภายในห้องพัก</h4>
                  {facilitiesinsidedorm.map((data, key) => {
                    let state = false;
                    let indexinner = 0;
                    fac.map((item, key) => {
                      if (data == item.facility) {
                        state = true;
                        indexinner = key;
                      }
                    });
                    return (
                      <div key={key}>
                        <input
                          type="checkbox"
                          id={key}
                          value={data}
                          defaultChecked={state == true ? true : false}

                          onChange={Onchangefac('ภายในห้องพัก')}
                        ></input>
                        <label htmlFor={key}>{data}</label>
                      </div>
                    );
                  })}
                </div>
                <div className="facilites-center">
                  <h4 className="space">ส่วนกลาง</h4>
                  {facilitiescenter.map((data, key) => {
                    let state = false;
                    fac.map((item, k) => {
                      if (data == item.facility) {
                        state = true;
                      }
                    });
                    return (
                      <div key={key}>
                        <input
                          type="checkbox"
                          id={key}
                          value={data}
                          defaultChecked={state == true ? true : false}
                          onChange={Onchangefac('ส่วนกลาง')}
                        ></input>
                        <label htmlFor={key}>{data}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <br />
              <h2>รายละเอียดหอพัก</h2>
              <textarea
                className="chong-detail "
                defaultValue={dorm.detail}
                onChange={(e) => {
                  setDorm(prev=>({
                    ...prev,
                    detail:e.target.value
                  }))
                }}
              ></textarea>
              <br />
              <h2>ข้อมูลติดต่อ</h2>
              <ul>
                <h4 className="space2">ชื่อผู้ดูแลหอพัก</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.ad_Name}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      ad_Name:e.target.value
                    }))
                  }}
                ></input>
                <br />
                <h4 className="space2">เบอร์ติดต่อ</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.contact_Number}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      contact_Number:e.target.value
                    }))
                  }}
                ></input>
                <br />
                <h4 className="space2">อีเมล</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.e_Mail}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      e_Mail:e.target.value
                    }))
                  }}
                ></input>
                <br />
                <h4 className="space2">LineID</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.line_ID}
                  onChange={(e) => {
                    setDorm(prev=>({
                      ...prev,
                      line_ID:e.target.value
                    }))
                  }}
                ></input>
              </ul>
              <br />
              <h2>อัลบั้มภาพหอพัก</h2>
              <div className="edit-image-container">
                {img.map(data => {
                  return (
                    <div className="Image-edit-block">
                      <img
                        className="Image-edit-dorm"
                        src={"img_Dorm/" + data.image}
                      />
                      <img src={DeleteIcon} id="Delete-Icon" onClick={OnclickImage(data.image_ID, data.image)} />
                    </div>
                  )
                })}
              </div>
              <input type="file" className="file-input-edit" multiple onChange={OnchangeImage}></input>
            </form>
          </div>
        )}
        {/* ---------------------------------------------------------------------- */}

        {showedit == false ? (
          <button
            className="but-edit-dorm"
            onClick={() => {
              setShowedit(true);
            }}
          >
            แก้ไขข้อมูลหอพัก
          </button>
        ) : (
          <button
            className="save-edit-dorm"
            onClick={EditDorm}>
            บันทึก
          </button>
        )}
      </div>


    </div>
  );
};

export default Owner;
