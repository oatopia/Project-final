import { React, useEffect, useState } from 'react';
import Navbar from '../component/Navbar/NavbarMember.js';
// import './dormdetail.css'
import { useHistory, useLocation } from 'react-router';
import Axios from "axios";
import bookon from "../img/bookon.png";
import bookoff from "../img/bookoff.png";
import Auth from "../service/authService.js";
import authHeader from "../service/auth-header.js";
import async from 'async'

function BookdormDetail() {
  const history = useHistory();
  const url = "https://matching-dorm-tu-server.herokuapp.com/";
  const [dorm,setDorm] = useState({})
  const [facilities,setFacilities] = useState([]) 
  const [room,setRoom] = useState([])
  const [image,setImage] = useState([])
  const currentUser = Auth.getCurrentUser();
  let location = useLocation();
  let dataState = location.state;
  

  useEffect(()=>{
    
    
    window.scrollTo(0, 0)
    async function fetchData(){
        const result = await Axios.post(
            url+"api/match/getDormDetail",{ID:dataState.dorm_ID},
            { headers: authHeader() }
          );
          console.log("Result",result.data[1]);
          console.log("Result",result.data[0][0].dorm_Name);
        //   setData(result.data)
          setDorm(result.data[0][0]);
          setImage(result.data[1]);
          setRoom(result.data[2]);
          setFacilities(result.data[3]);

    }
    fetchData();
  },[]);



  const handleonclick = (id)=>(e) => {
      e.target.setAttribute("src", bookoff)
      Axios.delete(url+`/api/match/deletebook/${id}`, {
        headers: authHeader(),
      })
    }

  return (
    <div className="dormVisitor-container">
      <div className='Navbar-shadow-box'>
        <Navbar></Navbar>
      </div>

      <div className="dormVisitor-block">
        <div className="dorm-data-container">
          <label className="name-dormVisitor">หอพัก{dorm.dorm_Name}</label>
          <img className="book-icon book-icon-in-detail-page" src={bookon} onClick={handleonclick(dataState.save_ID)} />
          <div className="image-dormVisitor-container">
            {image.map(img => {
              return <img className='img-box-dormVisitor' src={url+"img_Dorm/" + img.image}></img>
            })}
          </div>


          <div className='content-dormVisitor'>

            <div className="address-dormVisitor">
              <h3>ที่อยู่</h3>
              <p>{dorm.address}</p>
            </div>

            <div className="type-typeroom-cost-container">
              <div className="type-dormVisitor">
                <h3>ประเภทหอพัก</h3>
                <p>{dorm.type_D}</p>
              </div>

              <div className='table-continaer-dormVisitor'>
                <h3 className='room-type-dormVisitor'>ประเภทห้องพัก</h3>
                <table className='table-dormVisitor'>
                  <thead>
                    <tr>
                      <th>
                        ประเภท
                    </th>
                      <th>
                        ราคา
                    </th>
                    </tr>
                    {room.map(room => {
                      return (
                        <tr>
                          <td>
                            {room.room_Type}
                          </td>
                          <td>
                            {room.room_Price}
                          </td>
                        </tr>
                      )
                    })}
                  </thead>
                </table>
              </div>
              <div className='table-cost-container-dormVisitor'>
                <h3 className='cost-dormVisitor'>รายละเอียดค่าใช้จ่าย</h3>
                <table className='table-cost-dormVisitor'>
                  <thead>
                        <tr>
                          <td>
                            <span>เงินมัดจำ/ประกัน</span>
                          </td>
                          <td>
                            {dorm.deposit} บาท
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <span>ค่าส่วนกลาง</span>
                          </td>
                          <td>
                            {dorm.common_Fee} บาท
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <span> อัตราค่าน้ำ</span>
                          </td>
                          <td>
                            {dorm.water_Bill} บาทต่อยูนิต
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <span>อัตราค่าไฟ</span>
                          </td>
                          <td>
                            {dorm.electric_Bill} บาทต่อยูนิต
                          </td>
                        </tr>
                  </thead>
                </table>
              </div>

            </div>




            <div className="facilities-dormVisitor">
              <h3>สิ่งอำนวยความสะดวก</h3>
              <div className="faciliites-content-dormVisitor">
                <div className="fac-inner-dormVisitor">
                  <h4>ภายในห้องพัก</h4>
                  {facilities.map(data => {
                    if (data.type_F == 'ภายในห้องพัก') {
                      return (<li>{data.facility}</li>)
                    }
                  })}
                </div>

                <div className="fac-center-dormVisitor">
                  <h4>ส่วนกลาง</h4>
                  {facilities.map(data => {
                    if (data.type_F == 'ส่วนกลาง') {
                      return (<li>{data.facility}</li>)
                    }
                  })}
                </div>
              </div>
            </div>


            <div className="detail-contact-container-dormVisitor">
              <div className="detail-container-dormVisitor">
                <h3>รายละเอียดหอพัก</h3>
                <p>{dorm.detail}</p>
              </div>

              <div className="contact-container-dormVisitor">
                <h3>ข้อมูลติดต่อ</h3>
                <table className='table-contact-dormVisitor'>
                  <thead>
                    <tr>
                      <td>
                      <span> ชื่อผู้ดูแลหอพัก</span>
                      </td>
                      <td>
                      {dorm.ad_Name}
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <span> เบอร์ติดต่อ </span>
                      </td>
                      <td>
                      {dorm.contact_Number}
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <span> อีเมล </span>
                      </td>
                      <td>
                      {dorm.e_Mail}
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <span> Line ID </span>
                      </td>
                      <td>
                      {dorm.line_ID}
                      </td>
                    </tr>
                  </thead>
                </table>
              </div>
                  
            </div>
            <button className='btn-back-dormVisitor' onClick={()=>{ history.goBack()}}>ย้อนกลับ</button>
          </div>
        </div>   
      </div> 
    </div>
  );
}

export default BookdormDetail;