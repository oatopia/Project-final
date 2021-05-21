import { React, useEffect, useState } from "react";
import "./Admin.css";
import Axios from "axios";
import NavbarAdmin from "../component/Navbar/NavbarAdmin.js";
import deleteicon from "../img/deleteicon.png";
import editicon from "../img/edit.png";
import user from "../img/user 2.png";

function Admin() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const [member, setMember] = useState([]);
  const [owner, setOwner] = useState([]);
  const [editAC, setEditAC] = useState("");
  const [editun, setEditUN] = useState("");
  const [editT, setEditT] = useState("");
  const [state, setState] = useState(true)


  const deletetMember = (id) => {
    console.log("ID:", id);
    Axios.delete(`api/Admin/userDelete/${id}`).then((Response) => {
      setMember(
        member.filter((val) => {
          return val.member_ID != id;
        })
      );
    });
  };

  const deleteOwner = (id) => {
    console.log("ID:", id);
    Axios.delete(`api/Admin/userDelete/${id}`).then((Response) => {
      setMember(
        member.filter((val) => {
          return val.member_ID != id;
        })
      );
    });
  };

  // const updateAccount = (id) => {
  //   console.log("ID:", id);
  //   Axios.put(url+`api/Admin/userUpdate/${id}`,{user_id: id, username: editun, type: editT}).then((Response) => {
  //     setEditAC("");
  //     setUser(user.map((item)=>{
  //       return item.user_id == id ? {user_id:id,username:editun,type:editT} 
  //       : item ;
  //     }))

  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };

  useEffect(() => {
    Axios.get("api/Admin/user")
      .then((Response) => {
        let data = Response.data
        setMember(data[0])
        setOwner(data[1])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Showmember = () => {
    return (
      <>
        {member.map(data => {
          return (
            <div className='account-box'>
              <div className='icon-username'>
                <img src={user} width='40px' height='40px'/>
                <h1>{data.username}</h1>
              </div>
              <div >
                <img
                  src={deleteicon}
                  onClick={() => {
                    deletetMember(data.member_ID);
                  }}
                  className="icon-user"
                ></img>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  const Showowner = () => {
    return (
      <>
        {owner.map(data => {
          return (
            <div className='account-box'>
              <div className='icon-username'>
              <img src={user} width='40px' height='40px'/>
                <h1>{data.username}</h1>
              </div>
              <div>
                <img
                  src={editicon}
                  // onClick={() => {
                  //   setEditAC(data.user_id);
                  // }}
                  className="icon-user"
                ></img>
                <img
                  src={deleteicon}
                  onClick={() => {
                    deleteOwner(data.owner_ID);
                  }}
                  className="icon-user"
                ></img>
              </div>
            </div>
          )
        })}
      </>
    )
  }




  return (
    <div className="contnet-user-Admin">
      <NavbarAdmin></NavbarAdmin>
      <h1 className="h1-user-Admin">บัญชีผู้ใช้งานทั้งหมด</h1>

      <div className="content2-user-admin">

        <div className='head-text-admin'>
          <h3 className='h3-text-admin' onClick={() => { setState(true) }} style={state == true ? { border: '2px solid #28527a'} : { color: '#0475AD' }}>
            สมาชิก
          </h3>
          <h3 className='h3-text-admin' onClick={() => { setState(false) }} style={state == false ? { border: '2px solid #28527a' } : { color: '#0475AD' }}>
            ผู้ประกอบการ
          </h3>
        </div>
        <div className='content-account-admin'>
          {state == true ? <Showmember /> : <Showowner />}
        </div>
        {/* {user.map((data) => {
          return (
            <div className="user-box-Admin">
              <div className="edit-box">
                <label className="user-info">{data.user_id}</label>
                {editAC == data.user_id ? (
                  <input
                    type="text"
                    className="user-info"
                    id="edit-input-user"
                    onChange={(e) => {
                      setEditUN(e.target.value);
                    }}
                  ></input>
                ) : (
                  <label className="user-info">{data.username}</label>
                )}

                {editAC == data.user_id ? (
                  <div className="edit-box-input">
                    <input
                      type="text"
                      className="user-info"
                      id="edit-input-user"
                      onChange={(e) => {
                        setEditT(e.target.value);
                      }}
                    ></input>
                    <button
                      className="save-edit-but-user"
                      onClick={() => {
                        updateAccount(data.user_id);
                      }}
                    >
                      บันทึก
                    </button>
                  </div>
                ) : (
                  <label className="user-info">{data.type}</label>
                )}
              </div>
              <div className="use-icon-box">
                <img
                  src={editicon}
                  onClick={() => {
                    setEditAC(data.user_id);
                  }}
                  className="icon-user"
                ></img>
                <img
                  src={deleteicon}
                  onClick={() => {
                    deleteAccount(data.user_id);
                  }}
                  className="icon-user"
                ></img>
              </div>
            </div>
          );
        })} */}
      </div>
      <div className="clear-user-Admin"></div>
    </div>
  );
}

export default Admin;
