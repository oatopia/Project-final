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
      console.log(data[0]);
      res.send(data[0]);
    }
  });
};