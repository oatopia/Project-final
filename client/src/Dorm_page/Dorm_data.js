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
    "ระบบรักษาความปลอดภัยแบบkeycard",
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
  const [name, setName] = useState("");
  const [type, setType] = useState("หอพักแยกชาย-หญิง");
  const [address, setAddress] = useState("");
  const [deposit, setDeposit] = useState("");
  const [water, setWater] = useState("");
  const [elec, setElec] = useState("");
  const [common, setCommon] = useState("");
  const [facilities, setfacilities] = useState([]);
  const [des, setDes] = useState("");
  const [nameOwn, setNameown] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lineid, setLineid] = useState("");
  // ---------------------------------------------------------------------

  const [dorm, setDorm] = useState([]);
  const [fac, setFac] = useState([]);
  const [img, setImg] = useState([]);
  const currentUser = Auth.getCurrentUser();
  const history = useHistory();
  const location = useLocation();
  const dorm_ID = location.state;
  const [showedit, setShowedit] = useState(false);

  useEffect(() => {
    Axios.post(
      url+"api/dorm/getDormdatabyId",
      { dorm_ID: dorm_ID },
      { headers: authHeader() }
    ).then((Response) => {
      console.log("Response dorm: ", Response.data);
      setDorm(Response.data[0]);
    });

    Axios.post(
      url+"api/dorm/getFac",
      { dorm_ID: dorm_ID },
      { headers: authHeader() }
    ).then((Response) => {
      console.log("Response fac: ", Response.data);
      setFac(Response.data);
    });

    Axios.post(
      url+"api/dorm/getImg",
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

  if (!currentUser) {
    return <Redirect to="/loginowner" />;
  }

  return (
    <div className="dormdata-container">
      <Navbar />
      <div className="box-dorm-data">
        {/* ---------------------------------------------------------------------- */}
        {showedit == false ? (
          <div className="box-info">
            <h1>{dorm.dorm_Name}</h1>
            {img.map((pic, key) => {
              return (
                <img
                  key={key}
                  className="img-dorm-data"
                  src={url+"img_Dorm/" + pic.Image}
                />
              );
            })}
            <div className="box-inner-data">
              <div>
              <p className="text-dorm-content"><label>ประเภทหอพัก</label> {dorm.type_D}</p>
              </div>
              
              <p className="text-dorm-content"><label>ที่อยู่</label> {dorm.address}</p>
              <h2>รายละเอียดค่าใช้จ่าย</h2>
              <p className="text-dorm-content"><h3>ค่าส่วนกลาง</h3> {dorm.deposit}</p>
              <p className="text-dorm-content"><h3>ค่าไฟ </h3>{dorm.electric_Bill}บาทต่อยูนิต</p>
              <p className="text-dorm-content"><h3>ค่าน้ำ</h3> {dorm.water_Bill}บาทต่อยูนิต</p>
              <p className="text-dorm-content"><h3>ค่าประกัน</h3> {dorm.common_Fee}</p>
            </div>
            <h2>สิ่งอำนวยความสะดวก</h2>
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
              <h2>ข้อมูลติดต่อ</h2>
              <p className="text-dorm-content"><h3>ชื่อผู้ดูแลหอพัก</h3> {dorm.ad_Name}</p>
              <p className="text-dorm-content"><h3>เบอร์ติดต่อ</h3> {dorm.contact_Number}</p>
              <p className="text-dorm-content"><h3>อีเมล </h3>{dorm.e_Mail}</p>
              <p className="text-dorm-content"><h3>Line ID</h3> {dorm.line_ID}</p>
            </div>
          </div>
        ) : (
          <div className="box-info">
            <form>
              <h2>ชื่อหอพัก</h2>
              <input
                className="chong-one"
                defaultValue={dorm.dorm_Name}
                onChange={(e) => {
                  const name = { ...dorm };
                  name.Dorm_Name = e.target.value;
                  setDorm(name);
                  console.log("onchange dormname", dorm);
                }}
              ></input>
              <br />
              <h2>ประเภทหอพัก</h2>
              <select
                className="type-dorm"
                defaultValue={dorm.type_D}
                onChange={(e) => {
                  const type = { ...dorm };
                  type.Type_D = e.target.value;
                  setDorm(type);
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
                  const add = { ...dorm };
                  add.address = e.target.value;
                  setDorm(add);
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
                    const depo = { ...dorm };
                    depo.deposit = e.target.value;
                    setDorm(depo);
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
                    const water = { ...dorm };
                    water.water_Bill = e.target.value;
                    setDorm(water);
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
                    const eb = { ...dorm };
                    eb.electric_Bill = e.target.value;
                    setDorm(eb);
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
                    const cf = { ...dorm };
                    cf.common_Fee = e.target.value;
                    setDorm(cf);
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
                          onChange={(e) => {
                            let checkinner = false;
                            let indinner = 0;
                            fac.map((item, key) => {
                              if (data == item.facility) {
                                checkinner = true;
                                indinner = key;
                              }
                            });
                            if (checkinner == true) {
                              let id = fac[indinner].f_ID;
                              Axios.delete(
                                url+`api/dorm/facdeleteDelete/${id}`
                              ).then((Response) => {
                                setFac(
                                  fac.filter((item) => {
                                    return item.f_ID != id;
                                  })
                                );
                              });
                              checkinner = false;
                            } else {
                              const facil = {
                                dorm_ID: dorm.dorm_ID,
                                type_F: "ภายในห้องพัก",
                                facility: data,
                              };
                              Axios.post(url+"api/dorm/addfacil", facil, {
                                headers: authHeader(),
                              }).then((Response) => {
                                console.log("Response dorm: ", Response.data);
                                setFac([
                                  ...fac,
                                  {
                                    f_ID: Response.data.insertId,
                                    dorm_ID: dorm.dorm_ID,
                                    type_F: "ภายในห้องพัก",
                                    facility: data,
                                  },
                                ]);
                              });
                              checkinner = true;
                            }
                          }}
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
                          onChange={(e) => {
                            console.log("before Delete2: ", fac);
                            let check = false;
                            let ind = 0;
                            fac.map((item, key) => {
                              if (data == item.facility) {
                                console.log("fac ส่วนกลาง : ", item);
                                check = true;
                                ind = key;
                              }
                            });

                            if (check == true) {
                              let id = fac[ind].f_ID;
                              Axios.delete(
                                url+`api/dorm/facdeleteDelete/${id}`
                              ).then((Response) => {
                                setFac(
                                  fac.filter((item) => {
                                    return item.f_ID != id;
                                  })
                                );
                                console.log("after Delete2: ", fac);
                              });
                              check = false;
                            } else {
                              const facil = {
                                dorm_ID: dorm.dorm_ID,
                                type_F: "ส่วนกลาง",
                                facility: data,
                              };
                              Axios.post(url+"api/dorm/addfacil", facil, {
                                headers: authHeader(),
                              }).then((Response) => {
                                console.log("Response ID: ", Response.data);
                                setFac([
                                  ...fac,
                                  {
                                    f_ID: Response.data.insertId,
                                    dorm_ID: dorm.dorm_ID,
                                    type_F: "ส่วนกลาง",
                                    facility: data,
                                  },
                                ]);
                                console.log("after add fac: ", fac);
                              });
                              check = true;
                            }
                          }}
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
                  const info = { ...dorm };
                  info.detail = e.target.value;
                  setDorm(info);
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
                    const lname = { ...dorm };
                    lname.ad_Name = e.target.value;
                    setDorm(lname);
                  }}
                ></input>
                <br />
                <h4 className="space2">เบอร์ติดต่อ</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.contact_Number}
                  onChange={(e) => {
                    const cn = { ...dorm };
                    cn.contact_Number = e.target.value;
                    setDorm(cn);
                  }}
                ></input>
                <br />
                <h4 className="space2">อีเมล</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.e_Mail}
                  onChange={(e) => {
                    const email = { ...dorm };
                    email.e_Mail = e.target.value;
                    setDorm(email);
                  }}
                ></input>
                <br />
                <h4 className="space2">LineID</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.line_ID}
                  onChange={(e) => {
                    const line = { ...dorm };
                    line.line_ID = e.target.value;
                    setDorm(line);
                  }}
                ></input>
              </ul>
              <br />
              <h2>อัลบั้มภาพหอพัก</h2>
              <input type="file" className="file-input" multiple></input>
            </form>
          </div>
        )}
        {/* ---------------------------------------------------------------------- */}

        {showedit == false ? (
          <></>
        ) : (
          <button
            className="save-edit-dorm"
            onClick={() => {
              // Axios.put(`/api/dorm/dormUpdate/${id}`, {
              //   user_id: id,
              //   username: editun,
              //   type: editT,
              // })
              //   .then((Response) => {
              //     setEditAC("");
              //     setUser(
              //       user.map((item) => {
              //         return item.user_id == id
              //           ? { user_id: id, username: editun, type: editT }
              //           : item;
              //       })
              //     );
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });
              setShowedit(false);
            }}
          >
            {" "}
            บันทึก{" "}
          </button>
        )}
        <button
          className="but-edit-dorm"
          onClick={() => {
            setShowedit(true);
          }}
        >
          แก้ไขข้อมูลหอพัก
        </button>
      </div>
    </div>
  );
};

export default Owner;
