import { React, useEffect, useState } from "react";
import Axios from "axios";
import "./showfactor.css";
import D1 from "../img/icon/D1.png";
import { useHistory } from "react-router";

export default function Match() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const [factorlist, setFactorlist] = useState([]);
  const [weight, setWeight] = useState([]);
  var history = useHistory();
  useEffect(() => {
    Axios.get(url+"api/visitor/getfactor").then((Response) => {
      setFactorlist(Response.data);
    });
  }, []);

  const addWeight = (index) => (e) => {
    if (weight.length) {
      let have = "false";
      weight.map((item) => {
        if (item.Id == index) {
          return (have = "true");
        }
        return (have = "false");
      });
      if (have == "true") {
        let edit = weight.map((item) => {
          if (item.Id == index) {
            return { ...item, Weight: e.target.value };
          }
          return item;
        });
        setWeight(edit);
      } else {
        setWeight([
          ...weight,
          { Id: index, Image: "", Weight: e.target.value },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([{ Id: index, Image: "", Weight: e.target.value }]);
    }
  };

  const addImage = (index) => (e) => {
    if (weight.length > 0) {
      let have = "false";
      weight.map((item) => {
        if (item.Id == index) {
          return (have = "true");
        }
        return (have = "false");
      });
      if (have == "true") {
        let edit = weight.map((item) => {
          if (item.Id == index) {
            return { ...item, Image: e.target.value };
          }
          return item;
        });
        setWeight(edit);
      } else {
        setWeight([
          ...weight,
          { Id: index, Image: e.target.value, Weight: "1" },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([{ Id: index, Image: e.target.value, Weight: "1" }]);
      console.log(weight);
    }
  };
  const showimage = () => {
    let index = 0;
    let array = [];
    for (let i = 0; i < factorlist.length; i++) {
      for (let j = i + 1; j < factorlist.length; j++) {
        array.push(
          <div id="contain-match-display" key={index}>
            <img
              className="img-match-visitor"
              value={factorlist[i].Image_factor}
              src={url+"images/" + factorlist[i].Image_factor}
              width="70px"
              height="70px"
              onClick={addImage(index)}
            ></img>
            <input
              value={factorlist[i].Id}
              type="radio"
              id="radio-1"
              name={index}
              onChange={addImage(index)}
            ></input>
            <img
              className="img-match-visitor"
              value={factorlist[j].Image_factor}
              src={url+"images/" + factorlist[j].Image_factor}
              width="70px"
              height="70px"
              onClick={addImage(index)}
            ></img>
            <input
              value={factorlist[j].Id}
              type="radio"
              id="radio-2"
              name={index}
              onChange={addImage(index)}
            ></input>
            <select
              className="select-score"
              defaultValue="1"
              onChange={addWeight(index)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        );
        index++;
      }
    }
    return array;
  };

  const matchFac = () => {
    Axios.post(url+"api/match/matchDorm", weight)
      .then((Response) => {
        console.log(Response.data);
        history.push({
          pathname: "/visitorResult",
          state: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-visitor">

      <div className="contain-factor-visitor">
        <div className="showfactor-left-box">
          <h1>จับคู่หอพัก</h1>
            วิธีการจับคู่
          <ol>
            <li>ให้ท่านเลือกปัจจัยที่ท่านคิดว่ามีความสำคัญมากที่สุดในแต่ละคู่</li>
            <li>จากนั้นเลือกระดับความสำคัญของปัจจัยให้ครบทุกคู่</li>
            <li>สุดท้ายกดปุ่มจับคู่</li>
          </ol>
        </div>
        <div className="showfactor-right-box">
          {factorlist.map((data, key) => {
            return (
              <div key={key} className="detail-visitor">
                <img
                  src={url+"images/" + data.Image_factor}
                  width="50"
                  height="50"
                ></img>
                <p className="Fn-visitor">{data.Factor_name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="containermatch2-visitor">
        {showimage()}
        <button onClick={matchFac} className="button-match-visitor">
          จับคู่หอพัก
        </button>
      </div>

    </div>
  );
}
