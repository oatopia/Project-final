import { React, useEffect, useState } from "react";
import Axios from "axios";
import "./showfactor.css";
import D1 from "../img/icon/D1.png";
import { useHistory } from "react-router";
import alert from '../img/alert.png'

export default function Match() {
  const url = "https://matching-dorm-tu-server.herokuapp.com/";
  const [factorlist, setFactorlist] = useState([]);
  const [weight, setWeight] = useState([]);
  const [count, setCount] = useState(0);
  const [arrayfactor, setArrayfactor] = useState([])
  const [statepair, setStatepair] = useState([])
  const [test, setTest] = useState('')
  const [pair, setPair] = useState([]);
  var history = useHistory();
  useEffect(() => {
    Axios.get("api/visitor/getfactor").then((Response) => {
      let data = Response.data
      let number = 0;
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          pair.push({
            index: number, first: data[i].factor_ID, second: data[j].factor_ID
            , image1: data[i].image_Factor, image2: data[j].image_Factor
            , title1: data[i].factor_Title, title2: data[j].factor_Title
          })
        }
        number++
      }
      setFactorlist(Response.data)
    })
  }, []);
  //   useEffect(() => {
  //     setPair(factorlist.map(item=>{return item.factor_Title}))
  //     for (let i = 0; i < 5; i++) {
  //       for (let j = 0; j < 5; j++) {
  //         console.log('i: ',i)
  //         setPair(prev=>[...prev,{co:i,co2:j}])
  //       }
  //     }
  // }, []);
  // useEffect(() => {
  //     let number = 0;
  //     for (let i = 0; i < factorlist.length; i++) {
  //       for (let j = i + 1; j < factorlist.length; j++) {
  //         setPair(prev=>[...prev,{
  //           index:number,first:factorlist[i].factor_ID,second:factorlist[j].factor_ID
  //           ,image1:factorlist[i].image_Factor,image2:factorlist[j].image_Factor
  //           ,title1:factorlist[i].factor_Title,title2:factorlist[j].factor_Title
  //         }])
  //       }
  //       number++
  //     }
  // }, []);
  console.log("Weight: ", weight)
  console.log("pair: ", pair)
  console.log("fac: ", factorlist)
  // console.log("array: ",arrayfactorpair)
  // choose factor--------------------------------------------
  const addfactor = (index) => e => {
    e.preventDefault()
    if (weight.length > 0) {
      var check = false;
      var INDEX = 0;
      for (let i = 0; i < weight.length; i++) {
        if (weight[i].index_compare == index) {
          check = true;
          INDEX = i;
        }
      }
      if (check == true) {
        const newWeight = [...weight];
        console.log("check true comparator: ", newWeight);
        newWeight[INDEX].comparator = e.target.value;
        setWeight(newWeight);

        statepair[INDEX] = e.target.value
        setStatepair(statepair)
      } else {
        setWeight([
          ...weight,
          { comparator: e.target.value, weight: 1, index_compare: index },
        ]);
        // setStatepair([...statepair,{e.target.value}])
        console.log(weight);
      }
    } else {
      setWeight([
        { comparator: e.target.value, weight: 1, index_compare: index },
      ]);
      setStatepair([...statepair, e.target.value])
      console.log(weight);
    }
  };

  const isSelect = (index, factor) => (e) => {
    console.log('HIIIII')
    let checkstate = false
    weight.map(item => {
      if (item.index_compare == index) {
        if (item.comparator == factor) {
          console.log("this is select")
          checkstate = true
        } else {
          checkstate = false
        }
      } else {
        checkstate = false
      }
    })
    return checkstate
  }

  const showfactorpair = (num) => {
    let arrayfactorpair = [];
    let index = 0;
    for (let i = 0; i < factorlist.length; i++) {
      for (let j = i + 1; j < factorlist.length; j++) {
        const factorI = factorlist[i].factor_ID;
        const factorJ = factorlist[j].factor_ID
        arrayfactorpair.push(
          <div className="match-block-container" key={index}>
            <div id="contain-match-display" key={index}>
              <label className="radio-label" >
                <input type='radio' name={index} value={factorI} onChange={addfactor(index)} />
                <div className="box-match" id="box-match-1" >
                  <img
                    className="img-match-visitor"
                    value={factorI}
                    src={url + "images/" + factorlist[i].image_Factor}
                    width="140px"
                    height="140px"
                  ></img>
                  <h4>{factorlist[i].factor_Title}</h4>
                </div>
              </label>
              <label className="radio-label">
                <input type='radio' name={index} value={factorJ} onChange={addfactor(index)} />
                <div className="box-match" id="box-match-2" >
                  <img
                    className="img-match-visitor"
                    value={factorJ}
                    src={url + "images/" + factorlist[j].image_Factor}
                    width="140px"
                    height="140px"
                  ></img>
                  <h4>{factorlist[j].factor_Title}</h4>
                </div>
              </label>
            </div>
            <div className="range-weight-container">
              <h2 className="head-h2-match">โปรดให้คะแนนระดับความสำคัญของปัจจัยที่ท่านเลือก</h2>
              <div className="input-range-container">
                <p>น้อยที่สุด</p>
                <input type="range" defaultValue='1' className="input-range-match" min="1" max="7" onChange={addWeight(index)} />
                <p>มากที่สุด</p>
              </div>

            </div>
          </div>

        )
        index++
      }
    }
    return arrayfactorpair[num]
  }


  // choose weight--------------------------------------------
  const addWeight = (index) => (e) => {
    if (weight.length > 0) {
      var check = false;
      var INDEX = 0;

      for (let i = 0; i < weight.length; i++) {
        if (weight[i].index_compare == index) {
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
          { comparator: "", weight: e.target.value, index_compare: index },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([
        { comparator: "", weight: e.target.value, index_compare: index },
      ]);
    }
  };

  const matchFac = () => {
    Axios.post(url + "api/visitor/matchDorm", weight)
      .then((Response) => {
        console.log(Response.data);
        history.push({
          pathname: "/matchVisitor",
          state: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const showpair = (n) => {
    let content = null
    pair.map((item, key) => {
      if (n == key) {
        return content = (
          <div className="match-block-container" key={key}>
            <div id="contain-match-display" >
              
              <label for='radio-btn1' >
                <div className="box-match" id="box-match-1" >
                  <img
                    className="img-match-visitor"
                    src={url + "images/" + item.image1}
                    width="140px"
                    height="140px"
                  ></img>
                  <h4>{item.title1}</h4>
                </div>
              </label>
              <input id='radio-btn1' type='radio' name={item.index} value={item.first} onChange={addfactor(key)} />
              
              <label for='radio-btn'>
                <div className="box-match" id="box-match-2" >
                  <img
                    className="img-match-visitor"
                    src={url + "images/" + item.image2}
                    width="140px"
                    height="140px"
                  ></img>
                  <h4>{item.title2}</h4>
                </div>
              </label>
              <input type='radio' id='radio-btn' name={item.index} value={item.second} onChange={addfactor(key)} />
            </div>
            <div className="range-weight-container">
              <h2 className="head-h2-match">โปรดให้คะแนนระดับความสำคัญของปัจจัยที่ท่านเลือก</h2>
              <div className="input-range-container">
                <p>น้อยที่สุด</p>
                <input type="range" defaultValue='1' className="input-range-match" min="1" max="7" onChange={addWeight(key)} />
                <p>มากที่สุด</p>
              </div>

            </div>
          </div>
        )
      }
    }
    )
    return content
  }










  return (
    <div className="container-visitor">
      <div className="contain-factor-visitor">
        <div className="heading-box">
          <h1>จับคู่หอพัก</h1>
        </div>
        <h1 className="head-h1-match">กรุณาทำแบบสอบถามเบื้องต้นเพื่อประเมินความสนใจของท่าน</h1>
        <img src={alert} className="icon-alert"></img>
        <div className="showfactor-right-box">
          <h2>ความหมายของปัจจัยในการตัดสินใจเลือกหอพัก</h2>
          {factorlist.map((data, key) => {
            return (
              <div key={key} className="detail-factor-visitor">
                <img
                  src={url + "images/" + data.image_Factor}
                  width="50"
                  height="50"
                ></img>
                <div className="detail-visitor">
                  <h3>{data.factor_Title}</h3>
                  <p className="Fn-visitor">{data.factor_Name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-match-visitor">
        <div className="container-inner-match-visitor">
          <div className="containermatch2-visitor">
            <h2 className="head-h2-match">ท่านคิดว่าปัจจัยในด้านใดจำเป็นต่อตัวท่านมากที่สุด</h2>
            {/* {arrayfactor[count]} */}
            {/* {showfactorpair(count)} */}
            {/* {arrayfactor.map(item=>{return item})} */}
            {/* {Arraypair.map(item=>{return item})} */}
            {/* {Arraypair[0]}; */}
            {showpair(count)}
          </div>
          {/* <button onClick={matchFac} className="button-match-visitor">
            จับคู่หอพัก
          </button> */}
          {/* <h4>rt{pair[1].index}</h4> */}

          {/* {pair.map((item,key)=>{
            if(count == key){
              return <h4>{item.title1}</h4>
            }
          })} */}

          <div className="button-match-container">
            {count != 0 ? <button className="button-back" onClick={(e) => {
              setCount(count - 1)
            }}>ย้อนกลับ</button> : <></>}
            {count != arrayfactor.length - 1 ? <button className="button-next" onClick={(e) => {
              setCount(count + 1)
            }}>ถัดไป</button> : <></>}
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
}
