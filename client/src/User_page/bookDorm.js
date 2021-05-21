import { React, useEffect, useState } from "react";
import "./bookDorm.css";
import NavbarMember from "../component/Navbar/NavbarMember.js";
import Axios from "axios";
import bookon from "../img/bookon.png";
import bookoff from "../img/bookoff.png";
import Auth from "../service/authService.js";
import authHeader from "../service/auth-header.js";

function ResultMatch() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const currentUser = Auth.getCurrentUser();
  const [mark, setMark] = useState([]);
  const [checkdata,setCheckdata] = useState(false)
  useEffect(() => {
    Axios.post(
      "/api/match/getBookmark",
      { member_ID: currentUser.member_ID },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Book mark dorm: ", Response.data);
        let res = Response.data;
        if (res.length > 0) {
          setCheckdata(true)
          setMark(res);
        }
      })
      .catch((error) => {
        console.log("Error from get Bookmark", error);
      });
  }, []);

  const handleonclick = (e,data) => {
    let stateinside = false;
    let mid = 0;
    mark.map((item) => {
      if (item.Dorm_ID == data.Dorm_ID) {
        stateinside = true;
        mid = item.M_ID;
      }
    });
    if (stateinside == true) {
      e.target.setAttribute("src", bookoff);
      let id = mid;
      Axios.delete(url+`/api/match/deletebook/${id}`, {
        headers: authHeader(),
      })
        .then((Response) => {
          console.log("data from delete Book mark dorm: ", Response.data);
          setMark(
            mark.filter((item) => {
              return item.M_ID != id;
            })
          );
        })
        .catch((error) => {
          console.log("Error from save bookmark", error);
        });
      stateinside = false;
    } else {
      e.target.setAttribute("src", bookon);
      const payload = {
        user_id: currentUser.user_id,
        Dorm_ID: data.Dorm_ID,
      };
      Axios.post(url+"api/match/createbook", payload, {
        headers: authHeader(),
      })
        .then((Response) => {
          console.log("Book mark dorm: ", Response.data);
          setMark([
            ...mark,
            {
              M_ID: Response.data.insertId,
              user_id: currentUser.user_id,
              Dorm_ID: data.Dorm_ID,
            },
          ]);
        })
        .catch((error) => {
          console.log("Error from save bookmark", error);
        });
      stateinside = true;
    }
  };

  return (
    <div className="book-conatiner-bookDorm">
      <div className='navbar-container-bookdorm'>
      <NavbarMember/>
      </div>

      <div>
          <h1 className='h1-bookdorm'>รายการหอพักที่คุณสนใจ</h1>
        
        {mark.map(item=>{
              return(
                <div className='bookdorm-box'>
                  <h1>{item.dorm_Name}</h1>
                  <h1>{item.Image}</h1>
                </div>
              )
          })}
      </div>
    </div>
  );
}

export default ResultMatch;
