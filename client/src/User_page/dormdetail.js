import { React, useEffect, useState } from 'react';
import Navbar from '../component/Navbar/NavbarMember.js';
import './dormdetail.css'
import { useHistory, useLocation } from 'react-router';
import Axios from "axios";
import bookon from "../img/bookon.png";
import bookoff from "../img/bookoff.png";
import Auth from "../service/authService.js";
import authHeader from "../service/auth-header.js";
import { Redirect} from "react-router-dom";

function DormVisitor() {
  const history = useHistory();
  const url = "https://matching-dorm-tu-server.herokuapp.com/";
  let location = useLocation();
  let state = location.state;
  console.log("sate match:", state);
  const [bookmark,setBookmark] = useState({}) 
  const currentUser = Auth.getCurrentUser();

  useEffect(()=>{

    window.scrollTo(0, 0)
    
    if(state){
      let payload = {
        member_ID: currentUser.member_ID,
        dorm_ID: state.Dorm.dorm_ID
      }
      Axios.post(
        url+"api/match/checkbookmark",payload,
        { headers: authHeader() }
      ).then((Response) => {
          if(Response.data == ""){
            console.log("This dorm has not bookmark!")
          }else{
            console.log("This dorm has bookmark!")
            setBookmark(Response.data)
          }
        })
        .catch((error) => {
          console.log("Error from get dorm", error);
        });
    }else{
      
    }
    
  },[])



  const checkBook = (dormid) =>{
    let check = false
    if (bookmark.dorm_ID == dormid) {
      check = true;
      
    }
    return check
  }

  const handleonclick = (dormid)=>(e) => {
    let stateinside = false;
    let saveid = 0;
    if (bookmark.dorm_ID == dormid) {
        stateinside = true;
        saveid = bookmark.save_ID;
      }
    if (stateinside == true) {
      e.target.setAttribute("src", bookoff)
      let id = saveid;
      Axios.delete(url+`/api/match/deletebook/${id}`, {
        headers: authHeader(),
      })
        .then((Response) => {
          console.log("data from delete Book mark dorm: ", Response.data)
          setBookmark(
            bookmark.filter((item) => {
              return item.save_ID != id
            })
          )
        })
        .catch((error) => {
          console.log("Error from save bookmark", error)
        })

    } else {
      e.target.setAttribute("src", bookon);
      const payload = {
        member_ID: currentUser.member_ID,
        dorm_ID: dormid,
      };
      Axios.post(url+"api/match/createbook", payload, {
        headers: authHeader(),
      })
        .then((Response) => {
          console.log("Book mark dorm: ", Response.data);
          setBookmark(
            {
              member_ID: currentUser.member_ID,
              dorm_ID: dormid,
              save_ID: Response.data.insertId
            });
        })
        .catch((error) => {
          console.log("Error from save bookmark", error);
        });
    }
  };

  return (
    <div className="dormVisitor-container">
      <div className='Navbar-shadow-box'>
        <Navbar></Navbar>
      </div>

      {state == "" ? <h1 className='text-not-found-dorm'>??????????????????????????????????????????????????????????????????</h1> :
      <div className="dormVisitor-block">
        <div className="dorm-data-container">
          <label className="name-dormVisitor">???????????????{state.Dorm.dorm_Name}</label>
          <img className="book-icon book-icon-in-detail-page" src={checkBook(state.Dorm.dorm_ID) == true ? bookon : bookoff} onClick={handleonclick(state.Dorm.dorm_ID)}/>
          <div className="image-dormVisitor-container">
            {state.Image.map(img => {
              return <img className='img-box-dormVisitor' src={url+"img_Dorm/" + img.image}></img>
            })}
          </div>


          <div className='content-dormVisitor'>

            <div className="address-dormVisitor">
              <h3>?????????????????????</h3>
              <p>{state.Dorm.address}</p>
            </div>

            <div className="type-typeroom-cost-container">
              <div className="type-dormVisitor">
                <h3>?????????????????????????????????</h3>
                <p>{state.Dorm.type_D}</p>
              </div>

              <div className='table-continaer-dormVisitor'>
                <h3 className='room-type-dormVisitor'>???????????????????????????????????????</h3>
                <table className='table-dormVisitor'>
                  <thead>
                    <tr>
                      <th>
                        ??????????????????
                    </th>
                      <th>
                        ????????????
                    </th>
                    </tr>
                    {state.Room.map(room => {
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
                <h3 className='cost-dormVisitor'>????????????????????????????????????????????????????????????</h3>
                <table className='table-cost-dormVisitor'>
                  <thead>
                        <tr>
                          <td>
                            <span>???????????????????????????/??????????????????</span>
                          </td>
                          <td>
                            {state.Dorm.deposit} ?????????
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <span>?????????????????????????????????</span>
                          </td>
                          <td>
                            {state.Dorm.common_Fee} ?????????
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <span> ?????????????????????????????????</span>
                          </td>
                          <td>
                            {state.Dorm.water_Bill} ?????????????????????????????????
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <span>??????????????????????????????</span>
                          </td>
                          <td>
                            {state.Dorm.electric_Bill} ?????????????????????????????????
                          </td>
                        </tr>
                  </thead>
                </table>
              </div>

            </div>




            <div className="facilities-dormVisitor">
              <h3>??????????????????????????????????????????????????????</h3>
              <div className="faciliites-content-dormVisitor">
                <div className="fac-inner-dormVisitor">
                  <h4>????????????????????????????????????</h4>
                  {state.Facility.map(data => {
                    if (data.type_F == '????????????????????????????????????') {
                      return (<li>{data.facility}</li>)
                    }
                  })}
                </div>

                <div className="fac-center-dormVisitor">
                  <h4>????????????????????????</h4>
                  {state.Facility.map(data => {
                    if (data.type_F == '????????????????????????') {
                      return (<li>{data.facility}</li>)
                    }
                  })}
                </div>
              </div>
            </div>


            <div className="detail-contact-container-dormVisitor">
              <div className="detail-container-dormVisitor">
                <h3>?????????????????????????????????????????????</h3>
                <p>{state.Dorm.detail}</p>
              </div>

              <div className="contact-container-dormVisitor">
                <h3>????????????????????????????????????</h3>
                <table className='table-contact-dormVisitor'>
                  <thead>
                    <tr>
                      <td>
                      <span> ????????????????????????????????????????????????</span>
                      </td>
                      <td>
                      {state.Dorm.ad_Name}
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <span> ????????????????????????????????? </span>
                      </td>
                      <td>
                      {state.Dorm.contact_Number}
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <span> ??????????????? </span>
                      </td>
                      <td>
                      {state.Dorm.e_Mail}
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <span> Line ID </span>
                      </td>
                      <td>
                      {state.Dorm.line_ID}
                      </td>
                    </tr>
                  </thead>
                </table>
              </div>
                  
            </div>
            <button className='btn-back-dormVisitor' onClick={()=>{ history.goBack()}}>????????????????????????</button>
          </div>
        </div>   
      </div>
       }
    </div>
  );
}

export default DormVisitor;