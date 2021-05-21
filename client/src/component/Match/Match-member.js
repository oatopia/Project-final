import { React, useEffect, useState } from "react";
import Axios from "axios";
import "./Match-member.css";
import { useHistory } from "react-router-dom";
import authHeader from "../../service/auth-header.js";
import Auth from "../../service/authService.js";

export default function Match() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const [factorlist, setFactorlist] = useState([]);
  const [weight, setWeight] = useState([]);
  const [pair, setPair] = useState([]);
  const [getweight, setGetweight] = useState([]);
  var history = useHistory();
  const currentUser = Auth.getCurrentUser();
  const [GETResponse, setGETResponse] = useState(false);
  const [state, setState] = useState(false);
  const [count, setCount] = useState(0);
  const [statecal, setStatecal] = useState(false)
  const [priority, setPriority] = useState([])

  useEffect(() => {
    // Axios.get(url + "api/match/getfactor", { headers: authHeader() })
    //   .then((Response) => {
    //     console.log(Response.data);
    //     setFactorlist(Response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error from get Factor", error);
    //   });
    Axios.post(
      "api/match/getWeight",
      { member_ID: currentUser.member_ID },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Respone from get weight", Response.data);
        if (Response.data.length > 0) {
          console.log("Get!!!!");
          console.log("Response ", Response.data);
          setWeight(Response.data[0])
          setFactorlist(Response.data[1])
          setPair(Response.data[2])
          // let data = Response.data[1]
          // for (let i = 0; i < data.length; i++) {
          //   for (let j = i + 1; j < data.length; j++) {
          //     pair.push({
          //       index: number, first: data[i].factor_ID, second: data[j].factor_ID
          //       , image1: data[i].image_Factor, image2: data[j].image_Factor
          //       , title1: data[i].factor_Title, title2: data[j].factor_Title
          //       , name1: data[i].factor_Name, name2: data[j].factor_Name
          //     })
          //     number++
          //   }

          // }
          // setGETResponse(true);
          // setState(true);
        } else {
          console.log("not get!!!");
          // setGETResponse(false);
          // setState(false);
        }
      })
      .catch((err) => {
        console.log("Error from get Weight", err);
      });
  }, []);








  const saveweight = () => {
    if (state == false) {
      const arrayweight = [];
      for (let i = 0; i < weight.length; i++) {
        weight.map((data) => {
          if (data.index_compare == i) {
            arrayweight.push(data);
          }
        });
      }
      console.log("save weight: ", arrayweight);
      const payload = {
        user_id: currentUser.user_id,
        data: arrayweight,
      };
      Axios.post("api/match/createweight", payload, { headers: authHeader() })
        .then((Response) => {
          console.log(Response.data);
          setState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("edit getweight save: ", weight);
      const payload = {
        user_id: currentUser.user_id,
        data: weight,
      };
      Axios.put("api/match/editWeight", payload, { headers: authHeader() })
        .then((Response) => {
          console.log(Response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };





  // const addImage = (index) => (e) => {
  //   if (weight.length > 0) {
  //     var check = false;
  //     var INDEX = 0;
  //     for (let i = 0; i < weight.length; i++) {
  //       if (weight[i].index_compare == index) {
  //         check = true;
  //         INDEX = i;
  //       }
  //     }
  //     if (check == true) {
  //       const newWeight = [...weight];
  //       console.log("check true comparator: ", newWeight);
  //       newWeight[INDEX].comparator = e.target.value;
  //       setWeight(newWeight);
  //     } else {
  //       setWeight([
  //         ...weight,
  //         { comparator: e.target.value, weight: "1", index_compare: index },
  //       ]);
  //       console.log(weight);
  //     }
  //   } else {
  //     setWeight([
  //       { comparator: e.target.value, weight: "1", index_compare: index },
  //     ]);
  //     console.log(weight);
  //   }
  // };





  // const addWeight = (index) => (e) => {
  //   if (weight.length > 0) {
  //     var check = false;
  //     var INDEX = 0;

  //     for (let i = 0; i < weight.length; i++) {
  //       if (weight[i].index_compare == index) {
  //         check = true;
  //         INDEX = i;
  //       }
  //     }

  //     if (check == true) {
  //       const newWeight = [...weight];
  //       console.log("check true weight: ", newWeight);
  //       newWeight[INDEX].weight = e.target.value;
  //       setWeight(newWeight);
  //     } else {
  //       setWeight([
  //         ...weight,
  //         { comparator: "", weight: e.target.value, index_compare: index },
  //       ]);
  //       console.log(weight);
  //     }
  //   } else {
  //     setWeight([
  //       { comparator: "", weight: e.target.value, index_compare: index },
  //     ]);
  //   }
  // };






  const showimage = (n) => {
    let index = 0;
    let array = [];
    for (let i = 0; i < factorlist.length; i++) {
      for (let j = i + 1; j < factorlist.length; j++) {
        array.push(
          <div>
            <div id="contain-match-display" key={index}>
              <img
                value={factorlist[i].image_Factor}
                src={"images/" + factorlist[i].image_Factor}
                width="70"
                height="70"
              ></img>
              <input
                // value={factorlist[i].Id}
                type="radio"
                // id="radio-1"
                name={index}
              // onChange={addImage(index)}
              // checked
              />
              <img
                value={factorlist[j].image_Factor}
                src={"images/" + factorlist[j].image_Factor}
                width="70"
                height="70"
              ></img>
              <input
                // checked
                // value={factorlist[j].Id}
                type="radio"
                // id="radio-2"
                name={index}
              // onChange={addImage(index)}
              />

            </div>
            <input className="range-match-member" type='range' />
          </div>
        );
        index++;
      }
    }
    return array[n];
  };




  const onChangeWeight = (index) => (e) => {
    console.log(weight);
    let INDEX = 0;
    for (let i = 0; i < weight.length; i++) {
      if (weight[i].index_compare == index) {
        INDEX = i;
      }
    }
    const newWeight = [...weight];
    newWeight[INDEX].weight = e.target.value;
    setWeight(newWeight);

    // setWeight(
    //   weight.map((data) => {
    //     if (data.index_compare == index) {
    //       return { ...data, weight: e.target.value };
    //     }
    //   })
    // );
  };

  const onChangeFactor = (index) => (e) => {
    let INDEX = 0;
    for (let i = 0; i < weight.length; i++) {
      if (weight[i].index_compare == index) {
        INDEX = i;
      }
    }
    const newWeight = [...weight];
    newWeight[INDEX].comparator = e.target.value;
    setWeight(newWeight);
    // setWeight(
    //   weight.map((data) => {
    //     if (data.index_compare == index) {
    //       return { ...data, comparator: e.target.value };
    //     }
    //   })
    // );
  };

  const showfacwithWeight = () => {
    let index = 0;
    let array = [];
    for (let i = 0; i < factorlist.length; i++) {
      for (let j = i + 1; j < factorlist.length; j++) {
        array.push(
          <div id="contain-match-display" key={index}>
            <img
              value={factorlist[i].Image_factor}
              src={url + "images/" + factorlist[i].Image_factor}
              width="70"
              height="70"
            ></img>

            <input
              value={factorlist[i].Id}
              type="radio"
              id="radio-1"
              name={index}
              onChange={onChangeFactor(index)}
              defaultChecked={factorlist[i].Id == weight[index].comparator}
            ></input>
            {/* {factorlist[i].Id == weight[index].comparator ? (
              <input
                value={factorlist[i].Id}
                type="radio"
                id="radio-1"
                name={index}
                onChange={onChangeFactor(index)}
                checked={}
              ></input>
            ) : (
              <input
                value={factorlist[i].Id}
                type="radio"
                id="radio-1"
                name={index}
                onChange={onChangeFactor(index)}
              ></input>
            )} */}

            <img
              value={factorlist[j].Image_factor}
              src={url + "images/" + factorlist[j].Image_factor}
              width="70"
              height="70"
            ></img>

            <input
              value={factorlist[j].Id}
              type="radio"
              id="radio-2"
              name={index}
              onChange={onChangeFactor(index)}
              defaultChecked={factorlist[j].Id == weight[index].comparator}
            ></input>
            {/* {factorlist[j].Id == weight[index].comparator ? (
              <input
                value={factorlist[j].Id}
                type="radio"
                id="radio-2"
                name={index}
                onChange={onChangeFactor(index)}
                checked
              ></input>
            ) : (
              <input
                value={factorlist[j].Id}
                type="radio"
                id="radio-2"
                name={index}
                onChange={onChangeFactor(index)}
              ></input>
            )} */}

            <select
              className="select-score"
              defaultValue={weight[index].weight}
              onChange={onChangeWeight(index)}
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


  const addfactor = (index) => e => {
    if (weight.length > 0) {
      var check = false;
      var INDEX = 0;
      for (let i = 0; i < weight.length; i++) {
        if (weight[i].index == index) {
          check = true;
          INDEX = i;
        }
      }
      if (check == true) {
        const newWeight = [...weight];
        console.log("check true comparator: ", newWeight);
        newWeight[INDEX].factor_ID = e.target.value;
        setWeight(newWeight);
      } else {
        setWeight([
          ...weight,
          { factor_ID: e.target.value, weight: 1, index: index },
        ]);
        // setStatepair([...statepair,{e.target.value}])
        console.log(weight);
      }
    } else {
      setWeight([
        { factor_ID: e.target.value, weight: 1, index: index },
      ]);
      console.log(weight);
    }
  };


  const addWeight = (index) => (e) => {
    if (weight.length > 0) {
      var check = false;
      var INDEX = 0;

      for (let i = 0; i < weight.length; i++) {
        if (weight[i].index == index) {
          check = true;
          INDEX = i;
        }
      }

      if (check == true) {
        const newWeight = [...weight];
        console.log("check true weight: ", newWeight);
        newWeight[INDEX].weight = e.target.value;
        setWeight(newWeight);
      } else {
        setWeight([
          ...weight,
          { factor_ID: "", weight: e.target.value, index: index },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([
        { factor_ID: "", weight: e.target.value, index: index },
      ]);
    }
  };


  const isSelect = (number, factor) => {
    let checkstate = false
    for (let i = 0; i < weight.length; i++) {
      if (weight[i].index == number) {
        if (weight[i].factor_ID == factor) {
          checkstate = true
          break
        } else {
          checkstate = false
        }
      } else {
        checkstate = false
      }
    }
    return checkstate
  }


  const isWeight = (number) => {
    let value = 1;
    for (let i = 0; i < weight.length; i++) {
      if (weight[i].index == number) {
        value = weight[i].weight
      }
    }
    return value
  }




  const matchFac = () => {
    Axios.post(url + "api/match/matchDorm", weight, { headers: authHeader() })
      .then((Response) => {
        console.log(Response.data);
        history.push({
          pathname: "/resultmatch",
          state: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };






  const Showpair = () => {

    let paring = pair.map((obj,key) => {
      return (
        <div>
          <div id="contain-match-display" >
            <label className='radio-container'>
              <input id='radio-btn1' type='radio' defaultChecked={isSelect(key, obj.factor_ID1)} name={obj.index} value={obj.factor_ID1} onChange={addfactor(key)} />
              <div className="box-match" id="box-match-1" >
                <img
                  className="img-match-visitor"
                  src={"images/" + obj.image_Factor1}
                  width="140px"
                  height="140px"
                ></img>
                <h4>{obj.factor_Title1}</h4>
              </div>
            </label>

            <label className='radio-container' >
              <input type='radio' id='radio-btn' defaultChecked={isSelect(key, obj.factor_ID2)} name={obj.index} value={obj.factor_ID2} onChange={addfactor(key)} />
              <div className="box-match" id="box-match-2" >
                <img
                  className="img-match-visitor"
                  src={"images/" + obj.image_Factor2}
                  width="140px"
                  height="140px"
                ></img>
                <h4>{obj.factor_Title2}</h4>
              </div>
            </label>

          </div>
          <div className="range-weight-container">
            <h2 className="head-h2-match">คุณคิดว่าปัจจัยที่คุณเลือกมีความสำคัญกว่าอีกปัจจัยเท่าใด</h2>
            <div className="input-range-container">
              <p>เท่ากัน</p>
              <input type="range" defaultValue={isWeight(key)} className="input-range-match" min="1" max="9" onChange={addWeight(key)} />
              <p>มากที่สุด</p>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="match-block-container">
        <h1 className="head-h1-match">กรุณาทำแบบสอบถามเบื้องต้นเพื่อประเมินความสนใจของคุณ</h1>
        <div className="showfactor-right-box">
          <h2>ความหมายของปัจจัยในการตัดสินใจเลือกหอพัก</h2>
          {factorlist.map((data, key) => {
            return (
              <div key={key} className="detail-factor-visitor">
                <img
                  src={"images/" + data.image_Factor}
                  width="50"
                  height="50"
                ></img>
                <h3>{data.factor_Title} :</h3>
                <p className="Fn-visitor">{data.factor_Name}</p>
              </div>
            );
          })}
        </div>
        <div className="containermatch2-visitor">
          <h2 className="head-h2-match">คุณคิดว่าปัจจัยในด้านใดจำเป็นต่อตัวคุณมากที่สุด</h2>
        </div>
          {paring[count]}
        <div className="button-match-container">
          {count != 0 ? <button className="button-back" onClick={(e) => {
            setCount(count - 1)
          }}>ย้อนกลับ</button> : <></>}
          {count != pair.length - 1 ? <button className="button-next" onClick={(e) => {
            setCount(count + 1)
          }}>ถัดไป</button> : <button className='btn-cal' >แสดงผลลัพธ์</button>}
        </div>
        <div className="clear"></div>
      </div>
    )
  }




  // const Showresult = () => {
  //   let value = [...priority]
  //   value.sort((a, b,) => b.value - a.value)
  //   console.log("value in showpriority ", value)
  //   return (
  //     <div className="result-cal-container">
  //       <h1 className='result-cal-priority-label'>ผลการวิเคราะห์คุณลักษณะส่วนบุคคลของคุณ</h1>
  //       <div className='result-cal-priority-container'>
  //         <table className='table-cal-priority'>
  //           {value.map(item => {
  //             return (

  //               <tr>
  //                 <td>
  //                   <h3 className='result-text'> คุณให้ความสำคัญกับ <span className="factor-result-cal">{item.factor.factor_Title}</span> </h3>
  //                 </td>
  //                 <td>
  //                   <h3 className='factor-result-cal'>{Math.round(parseInt(item.value * 100))}%</h3>
  //                 </td>
  //                 <td>
  //                   <img className="icon-factor-result" src={"images/" + item.factor.image_Factor} />
  //                 </td>
  //               </tr>

  //             )
  //           })}
  //         </table>
  //       </div>
  //       <button className="btn-match-dorm" onClick={matchFac}>จับคู่หอพัก</button>
  //     </div>
  //   )
  // }

  return (

    <div className="container-visitor">
      <div className="container-match-visitor">
        <div className="container-inner-match-visitor">
          <h1 className="head-match-dorm">จับคู่หอพัก</h1>
          {statecal == false ? <Showpair/> : <p>NOOOOOO</p>}
        </div>
      </div>
    </div>


    // <div className='color-background-member'>
    //   <div className="containermatch">
    //     <h1 id="header2">จับคู่หอพัก</h1>
    //     <h1 className="head-match-member">กรุณาทำแบบสอบถามเบื้องต้นเพื่อประเมินความสนใจของท่าน</h1>
    //     <div>
    //       <div className="containermatch-2">
    //         {factorlist.map((data, key) => {
    //         return (
    //           <div className="detail" key={key}>
    //             <img
    //               src={url + "images/" + data.Image_factor}
    //               width="50"
    //               height="50"
    //               id={key}
    //             ></img>
    //             <label>{data.Factor_name}</label>
    //           </div>
    //         );
    //       })}
    //       </div>
    //       <h3 id="header3">
    //         ท่านคิดว่าปัจจัยในด้านใดจำเป็นต่อตัวท่านมากที่สุด
    //     </h3>
    //       <div className="containermatch-3">
    //         {GETResponse == false ? showimage(count) : showfacwithWeight(count)}
    //       </div>

    //       <button className="btn-back-member">ย้อนกลับ</button>
    //       <button className="btn-next-member">ถัดไป</button>
    //       <button onClick={saveweight}>บันทึก</button>
    //       <button onClick={matchFac}>จับคู่หอพัก</button>
    //     </div>
    //   </div>
    // </div>
  );
}
