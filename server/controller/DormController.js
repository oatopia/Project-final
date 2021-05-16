import dormModel from "../model/DormModel.js";
import { upload } from '../middleware/upload.js'
import fs from 'fs'

export const createDorm = (req, res) => {
  const Dorm = new dormModel({
    dorm_Name: req.body.dorm_Name,
    type_D: req.body.type_D,
    address: req.body.address,
    deposit: req.body.deposit,
    electric_Bill: req.body.electric_Bill,
    water_Bill: req.body.water_Bill,
    common_Fee: req.body.common_Fee,
    detail: req.body.detail,
    ad_Name: req.body.ad_Name,
    contact_Number: req.body.contact_Number,
    e_Mail: req.body.e_Mail,
    line_ID: req.body.line_ID,
    owner_ID: req.body.owner_ID,
  });
  dormModel.createDorminfo(Dorm, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.send(data);
    }
  });
};

export const createFacilities = (req, res) => {

  const id = req.body.dorm_ID;
  const jsondata = req.body.facilities;
  console.log("facilities: ", jsondata)
  const object = {
    dorm_ID: id,
    facilities: jsondata,
  };
  dormModel.createFac(object, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const createImage = (req, res) => {
  const id = req.body.dorm_ID;
  console.log("ID in body", id)
  console.log("Image files: ", req.files)
  const file = req.files.Image;
  var imagename = [];

  if (file.length === undefined) {
    imagename.push(file.name);
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      file.mv("public/img_Dorm/" + file.name, (err) => {
        if (err) return console.log(err);
      });
    }
  } else {
    console.log("file: ", file);
    console.log("file length", req.files.Image.length);

    for (let i = 0; i < file.length; i++) {
      imagename.push(file[i].name);
      if (
        file[i].mimetype == "image/jpeg" ||
        file[i].mimetype == "image/png" ||
        file[i].mimetype == "image/gif"
      ) {
        file[i].mv("public/img_Dorm/" + file[i].name, (err) => {
          if (err) return console.log(err);
        });
      }
    }
  }
  const object = {
    dorm_ID: id,
    image_Name: imagename,
  };
  console.log("object: ", object);
  dormModel.createImg(object, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getDorm = (req, res) => {
  const id = req.body.owner_ID;
  dormModel.getdormbyID(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getDormDataByID = (req, res) => {
  const id = req.body.dorm_ID;
  console.log("Dorm id: ", id);
  dormModel.getdormdatabyID(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getFacilities = (req, res) => {
  const id = req.body.dorm_ID;
  console.log("Dorm id: ", id);
  dormModel.getfacilitiesbyID(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getImage = (req, res) => {
  const id = req.body.dorm_ID;
  console.log("Dorm id: ", id);
  dormModel.getimagebyID(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const deletefacbyID = (req, res) => {
  const fid = req.params.id
  console.log("fac id: ", fid);
  dormModel.deleteFacbyId(fid, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const addfac = (req, res) => {
  const object = req.body
  console.log(object)
  dormModel.addFac(object, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from add fac: ", data)
      res.send(data);
    }
  });
};


export const deleteImage = (req, res) => {
  const imageID = req.params.id;
  const filename = req.body.image
  fs.unlink("public/img_Dorm/"+filename,(err)=>{
    if(err){
      throw err
    }else{
      console.log("Delete file in folder success!")
    }
  })
  dormModel.deleteImagebyID(imageID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const updateDorm = (req, res) => {
  const object = req.body
  console.log("Object for update dorm: ",req.body)
  console.log("ID dorm",object.dorm_ID)
  dormModel.updateDormbyID(object, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};