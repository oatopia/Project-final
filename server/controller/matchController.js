import matchmodel from "../model/matchModel.js";
import {calmatrix,calMatLength,magDorm}from '../util/calmatch.js';
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
  let jsondata = req.body;
  matchmodel.createWeight([jsondata], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const matchDorm = (req, res) => {
  let jsondata = req.body;
  console.log(jsondata);
  // let matrix = [];
  let Matrixlength = calMatLength(jsondata.length);
  console.log(Matrixlength);

  let Matrixcal = calmatrix(jsondata);
  console.log("data",Matrixcal);


  let DormData = [];
  try{
    DormData = JSON.parse(fs.readFileSync("Score_Dorm.txt",'utf-8'));
  }catch(err){
    console.log(err);
  }
  
  console.log("Dorm data:"+DormData);
  let ArrayDorm = magDorm(DormData,Matrixlength);
  console.log("Array Dorm",ArrayDorm);

  let suiValue = 0;
  for (let i = 0; i < ArrayDorm.length; i++) {
    for (let j = 0; j < Matrixcal.length; j++) {
      if((j+1) == ArrayDorm[i].Score_ID[j].Feature_ID){
        suiValue = suiValue + (ArrayDorm[i].Score_ID[j].Score * Matrixcal[j])
      }
    }
    ArrayDorm[i].Sui_Value = suiValue;
    suiValue = 0;
  }

  console.log("Suitable Value: ",ArrayDorm);

  let MatchArray = [];
  let index = 0;
  for (let i = 0; i < 3; i++) {
    let maxvalue = ArrayDorm.reduce((max,value)=>(max > value.Sui_Value) ? max : value.Sui_Value);
    index = ArrayDorm.findIndex(i=>i.Sui_Value == maxvalue);
    MatchArray.push(ArrayDorm[index].Dorm_ID);
    ArrayDorm.splice(index,1);
  }
  console.log(MatchArray);

  matchmodel.getDormbyID(MatchArray, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

export const searchDorm = (req, res) => {
  const Dorm_name = req.body.Search;
  matchmodel.searchbyName(Dorm_name,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

export const testing = (req, res) => {
  const Dorm_name = req.body.Search;
  matchmodel.searchbyName(Dorm_name,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
      
    }
  });
};


