import visitormodel from "../model/visitorModel.js";
import { calmatrix, calMatLength, magDorm } from '../util/calmatch.js';
import fs from 'fs'

export const getfactor = (req, res) => {
  visitormodel.getallfactor((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const searchdorm = (req, res) => {
  const Dorm_name = req.body.dormname;
  console.log("dorm name: ", Dorm_name);
  visitormodel.searchbyName(Dorm_name, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
};


export const calPriority = (req, res) => {
  const priority = req.body;
  console.log("priority data: ",priority);
  let Matrixlength = calMatLength(priority.length);
  console.log('Matrixlength:',Matrixlength);
  let Matrixcal = calmatrix(priority)
  console.log("Matrixcal", Matrixcal);
  res.send(Matrixcal)
};






export const matchDorm = (req, res) => {
  let jsondata = req.body;
  // console.log(jsondata);
  // let matrix = [];
  let Matrixlength = calMatLength(jsondata.length);
  // console.log(Matrixlength);

  let Matrixcal = calmatrix(jsondata);
  // console.log("data", Matrixcal);


  let DormData = [];
  try {
    DormData = JSON.parse(fs.readFileSync("Score_Dorm.txt", 'utf-8'));
  } catch (err) {
    console.log(err);
  }

  // console.log("Dorm data:" + DormData);
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

  // console.log("Suitable Value: ", ArrayDorm);


  ArrayDorm.sort((a, b) => b.Sui_Value - a.Sui_Value);
  // console.log("Array sort:", ArrayDorm);

  let MatchArray = [];
  // let index = 0;

  for (let i = 0; i < ArrayDorm.length; i++) {
    MatchArray.push(ArrayDorm[i].dorm_ID);
  }
  console.log("MatchArray: ",MatchArray);

  visitormodel.getAllDorm((err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      let DormArray = [];
      for (let i = 0; i < MatchArray.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (MatchArray[i] == data[j].dorm_ID) {
            DormArray.push(data[j]);
          }
        }
      }
      console.log('result:',DormArray);
      res.send(DormArray);
    }
  });
};