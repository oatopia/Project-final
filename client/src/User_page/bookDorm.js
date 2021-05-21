import { React, useEffect, useState } from "react";
import "./bookDorm.css";
import NavbarMember from "../component/Navbar/NavbarMember.js";
import Axios from "axios";
import bookon from "../img/bookon.png";
import bookoff from "../img/bookoff.png";
import Auth from "../service/authService.js";
import authHeader from "../service/auth-header.js";
import { useHistory } from "react-router";

function ResultMatch() {
  const history = useHistory()
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const currentUser = Auth.getCurrentUser();
  const [book, setBook] = useState([]);
  const [checkdata, setCheckdata] = useState(false)
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
          setBook(res);
        }
      })
      .catch((error) => {
        console.log("Error from get Bookmark", error);
      });
  }, []);

  // const handleonclick = (e,data) => {
  //   let stateinside = false;
  //   let mid = 0;
  //   mark.map((item) => {
  //     if (item.Dorm_ID == data.Dorm_ID) {
  //       stateinside = true;
  //       mid = item.M_ID;
  //     }
  //   });
  //   if (stateinside == true) {
  //     e.target.setAttribute("src", bookoff);
  //     let id = mid;
  //     Axios.delete(url+`/api/match/deletebook/${id}`, {
  //       headers: authHeader(),
  //     })
  //       .then((Response) => {
  //         console.log("data from delete Book mark dorm: ", Response.data);
  //         setMark(
  //           mark.filter((item) => {
  //             return item.M_ID != id;
  //           })
  //         );
  //       })
  //       .catch((error) => {
  //         console.log("Error from save bookmark", error);
  //       });
  //     stateinside = false;
  //   } else {
  //     e.target.setAttribute("src", bookon);
  //     const payload = {
  //       user_id: currentUser.user_id,
  //       Dorm_ID: data.Dorm_ID,
  //     };
  //     Axios.post(url+"api/match/createbook", payload, {
  //       headers: authHeader(),
  //     })
  //       .then((Response) => {
  //         console.log("Book mark dorm: ", Response.data);
  //         setMark([
  //           ...mark,
  //           {
  //             M_ID: Response.data.insertId,
  //             user_id: currentUser.user_id,
  //             Dorm_ID: data.Dorm_ID,
  //           },
  //         ]);
  //       })
  //       .catch((error) => {
  //         console.log("Error from save bookmark", error);
  //       });
  //     stateinside = true;
  //   }
  // };

  return (
    <div className="book-conatiner-bookDorm">
      <div className='navbar-container-bookdorm'>
        <NavbarMember />
      </div>

      <div>
        <h1 className='h1-bookdorm'>รายการหอพักที่บันทึก</h1>

        {book.map((data, key) => {
          return (
            <div className="dorm-container" key={key} onClick={() => {
              history.push({
                pathname: "/dormdetail",
                state: data,
              })
            }}>
              <div className="start-result-box">
                <img className='img-dorm-box' src={"img_Dorm/" + data.Image[0].image}></img>
                <h1>หอพัก{data.Dorm.dorm_Name}</h1>
              </div>
              <div className="end-result-box">
                <img className="book-icon" src={bookon}/>
                <div className="line-end-box"></div>
                <div className="price-box">
                  <p className="price-text-head"> ราคาเริ่มต้น</p>
                  <p className="price-text-value">{data.Room[0].room_Price} บาท</p>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ResultMatch;
