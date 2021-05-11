import { React, useEffect, useState } from 'react';
import './visitorResult.css';
import Navbar from './component/Navbar.js';
import Axios from 'axios'
import { useLocation } from 'react-router';
import imagetest from './img/livingroom1.jpg'


function VisitorResult() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/";
  var location = useLocation();
  const state = location.state;
  console.log("sate match:", state);
  const [srcimg, setSrcimg] = useState(state.image[0].Image);


  return (
    <div className="contain-visitor-result">
      <Navbar></Navbar>
      {state == "" ? <h1>ไม่พบหอพักที่ท่านค้นหา</h1> :
        <div className="visitor-dorm-block">

          <div className="dorm-data-container">
            <label className="dormname">{state.information.Dorm_Name}</label>
            <div className="image-container">
              <img className="image-big" src={url + "img_Dorm/" + srcimg}></img>
              <div className="image-mini-container">
                {state.image.map((data, key) => {
                  return (
                    <img className="image-mini" src={url + "img_Dorm/" + data.Image} key={key} ></img>
                  )

                })}
              </div>
            </div>

            <div className="container-block-2">
              <div className="type-dorm-container">
                <h3>ประเภทหอพัก</h3>
                <p>{state.information.Type_D}</p>
              </div>

              <div className="address-container">
                <h3>ที่อยู่</h3>
                <p>{state.information.Address}</p>
              </div>
            </div>

            <div className="container-block-3">
              <div className="fee-container">
                <h2>รายละเอียดค่าใช้จ่าย</h2>
                <h3>เงินมัดจำ/ประกัน</h3>
                <p>{state.information.Address}</p>
                <h3>อัตราค่าน้ำ</h3>
                <p>{state.information.Address}</p>
                <h3>อัตราค่าไฟ</h3>
                <p>{state.information.Address}</p>
                <h3>ค่าส่วนกลาง</h3>
                <p>{state.information.Address}</p>
              </div>

              <div className="facilities-container">
                <h2>สิ่งอำนวยความสะดวก</h2>
                <div className="faciliites-content">
                  <div className="fac-inner">
                    <h3>ภายในห้องพัก</h3>
                    {state.facilities.map(data => {
                      if (data.Type_F == 'ภายในห้องพัก') {
                        return (<li>{data.Facility}</li>)
                      }
                    })}
                  </div>

                  <div className="fac-center">
                    <h3>ส่วนกลาง</h3>
                    {state.facilities.map(data => {
                      if (data.Type_F == 'ส่วนกลาง') {
                        return (<li>{data.Facility}</li>)
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>


            <div className="container-block-4">
              <div className="infor-container">
                <h3>รายละเอียดหอพัก</h3>
                <p>{state.information.Information}</p>
              </div>

              <div className="contact-container">
                <h2>ข้อมูลติดต่อ</h2>
                <h3>ชื่อผู้ดูแลหอพัก</h3>
                <p>{state.information.L_name}</p>
                <h3>เบอร์ติดต่อ</h3>
                <p>{state.information.Contact_Number}</p>
                <h3>อีเมล</h3>
                <p>{state.information.E_mail}</p>
                <h3>Line ID</h3>
                <p>{state.information.Line_ID}</p>
              </div>
            </div>

          </div>
        </div>
      }
    </div>
  );
}

export default VisitorResult;