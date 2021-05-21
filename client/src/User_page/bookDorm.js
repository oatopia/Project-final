import { React, useEffect, useState } from "react";
import "./resultmatch.css";
import NavbarMember from "../component/Navbar/NavbarMember.js";
import Axios from "axios";
import { useLocation } from "react-router";
import bookon from "../img/bookon.png";
import bookoff from "../img/bookoff.png";
import Auth from "../service/authService.js";
import authHeader from "../service/auth-header.js";

function ResultMatch() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const currentUser = Auth.getCurrentUser();
  const [mark, setMark] = useState([]);
  const [bookstate, setBookState] = useState([]);
  useEffect(() => {
    Axios.post(
      url+"/api/match/getBookmark",
      { user_id: currentUser.user_id },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Book mark dorm: ", Response.data);
        let res = Response.data;
        if (res.length > 0) {
          setMark(res);
          for (let i = 0; i < res.length; i++) {
            setBookState([
              ...bookstate,
              { Dorm_ID: res[i].Dorm_ID, status: true },
            ]);
            console.log("data in bookstate:", bookstate);
          }
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
      <NavbarMember></NavbarMember>

      <div className="content-resultmatchpage">
      </div>
    </div>
  );
}

export default ResultMatch;
