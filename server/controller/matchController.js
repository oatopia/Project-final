import matchmodel from "../model/matchModel.js";
import { calmatrix, calMatLength, magDorm } from '../util/calmatch.js';
import fs from 'fs'

export const getall = (req, res) => {
  matchmodel.getallfactor((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const createweight = (req, res) => {
  let payload = req.body;
  console.log("payload from create", payload);
  matchmodel.createWeight(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {

    }
  });
};


export const calPriority = (req, res) => {
  const priority = req.body;
  // console.log("priority information", priority);
  // let Matrixlength = calMatLength(priority.length);
  // console.log('Matrixlength:', Matrixlength);
  let Matrixcal = calmatrix(priority)
  // console.log("Matrixcal", Matrixcal);
  res.send(Matrixcal)
};






export const matchDorm = (req, res) => {
  let jsondata = req.body;
  console.log(jsondata);
  // let matrix = [];
  let Matrixlength = calMatLength(jsondata.length);
  console.log(Matrixlength);

  let Matrixcal = calmatrix(jsondata);
  console.log("data", Matrixcal);


  let DormData = [];
  try {
    DormData = JSON.parse(fs.readFileSync("Score_Dorm.txt", 'utf-8'));
  } catch (err) {
    console.log(err);
  }

  console.log("Dorm data:" + DormData);
  let ArrayDorm = magDorm(DormData, Matrixlength);
  console.log("Array Dorm", ArrayDorm);
  const ArrayDormlength = ArrayDorm.length;

  let suiValue = 0;
  for (let i = 0; i < ArrayDorm.length; i++) {
    for (let j = 0; j < Matrixcal.length; j++) {
      if ((j + 1) == ArrayDorm[i].Score_ID[j].factor_ID) {
        suiValue = suiValue + (ArrayDorm[i].Score_ID[j].score * Matrixcal[j])
      }
    }
    ArrayDorm[i].Sui_Value = suiValue;
    suiValue = 0;
  }

  ArrayDorm.sort((a, b) => b.Sui_Value - a.Sui_Value);
  console.log("Array sort:", ArrayDorm);

  let MatchArray = [];
  // let index = 0;

  for (let i = 0; i < 10; i++) {
    MatchArray.push(ArrayDorm[i].dorm_ID);
  }
  console.log(MatchArray);

  matchmodel.getAllDorm((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      let DormArray = [];
      for (let i = 0; i < MatchArray.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (MatchArray[i] == data[j].dorm_ID) {
            DormArray.push(data[j]);
          }
        }
      }
      console.log(DormArray);
      res.send(DormArray);
    }
  });
};

export const searchDorm = (req, res) => {
  const Dorm_name = req.body.Search;
  console.log("dorm name: ", Dorm_name);
  matchmodel.searchbyName(Dorm_name, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getWeight = (req, res) => {
  const member_ID = req.body.member_ID
  matchmodel.getweightbyID(member_ID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from get weight: ", data)
      
      let arraypair = []
      let factor = data[1]
      let number = 0;
      for (let i = 0; i < factor.length; i++) {
        for (let j = i + 1; j < factor.length; j++) {
          arraypair.push({
            index: number, factor_ID1: factor[i].factor_ID, factor_ID2: factor[j].factor_ID
            , image_Factor1: factor[i].image_Factor, image_Factor2: factor[j].image_Factor
            , factor_Title1: factor[i].factor_Title, factor_Title2: factor[j].factor_Title
            , factor_Name1: factor[i].factor_Name, factor_Name2: factor[j].factor_Name
          })
          number++
        }
      }
      
      let att = calmatrix(data[0])
      let arrayAtt = []
      for (let i = 0; i < att.length; i++) {
        arrayAtt.push({factor:factor[i],value:att[i]})
      }
      let payload = {
        weight:data[0],
        factor:data[1],
        pair:arraypair,
        attribute:arrayAtt
      }
      console.log("payload", payload)
      res.send(payload);
    }
  });
};



export const updateWeight = (req, res) => {
  let payload = req.body;
  console.log(payload);
  matchmodel.updateweightbyID(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  });
};

export const createBook = (req, res) => {
  let payload = req.body;
  console.log(payload);
  matchmodel.createbookbyID(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from create bookmark", data);
      res.send(data);
    }
  });
};

export const getBookmark = (req, res) => {
  const id = req.body.member_ID
  matchmodel.getbookmarkbyID(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from get bookmark: ",data)
      // let payload = []
      // let arraydorm = data[0]
      // console.log("arraydorm",arraydorm)
      // arraydorm.forEach(element => {
      //   let getimg = data[1].filter(item => item.dorm_ID == element.dorm_ID)
      //   let getroom = data[2].filter(item => item.dorm_ID == element.dorm_ID)
      //   let getfacility = data[3].filter(item => item.dorm_ID == element.dorm_ID)
      //   payload.push({
      //     Image: getimg,
      //     Room: getroom,
      //     Facility: getfacility,
      //     Dorm: element
      //   })
      // })
      // console.log('Payload', payload)
      res.send(data);
    }
  });
};

export const deleteBook = (req, res) => {
  const id = req.params.id
  console.log("id to delete bookmark:", id)
  matchmodel.deletebookmarkbyID(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from delete bookmark: ", data)
      res.send(data);
    }
  });
};

export const getDorm = (req, res) => {
  let payload = req.body;
  matchmodel.getdormdata(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from get dorm", data);
      // res.send(data);
      let arraydormdetail = []
      let arraydorm = data.dorm
      arraydorm.forEach(element => {
        let getimg = data.res[0].filter(item => item.dorm_ID == element.dorm_ID)
        let getroom = data.res[1].filter(item => item.dorm_ID == element.dorm_ID)
        let getfacility = data.res[2].filter(item => item.dorm_ID == element.dorm_ID)
        arraydormdetail.push({
          Image: getimg,
          Room: getroom,
          Facility: getfacility,
          Dorm: element
        })
      })
      let payload = {
        Dormlist:arraydormdetail,
        Bookmark: data.res[3]
      }

      console.log("payload data: ",payload);
      res.send(payload);
    }
  });
};


export const checkbook = (req, res) => {
  let payload = req.body;
  console.log("data dorm_ID: ",payload.dorm_ID," member_ID: ",payload.member_ID);
  matchmodel.checkdormbyID(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from get bookmark by ID: ", data);
      res.send(data[0]);
    }
  });
};


export const getDormdetail = (req, res) => {
  let dorm_ID = req.body.ID;
  console.log("dorm_ID is ",dorm_ID)
  matchmodel.getDormdetailbyID(dorm_ID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from get bookmark by ID: ", data);
      res.send(data);
    }
  });
};
