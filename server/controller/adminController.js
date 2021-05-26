import adminModel from "../model/adminModel.js";

export const getUser = (req, res) => {
  adminModel.getallUser((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getFactor = (req, res) => {
  adminModel.getallfactor((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const deleteMember = (req, res) => {
  let member_ID = req.params.id;
  adminModel.deleteMemberbyId(member_ID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const deleteOwner = (req, res) => {
  let owner_ID = req.params.id;
  adminModel.deleteOwnerbyId(owner_ID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const createFactor = (req, res) => {
  const newFactorTitle = req.body.new_factortitle
  const newFactor = req.body.new_factor;
  const file = req.files.ImageFactor;
  const image_name = file.name;
  const  objectImage = {
    factor_Title: newFactorTitle,
    factor_Name: newFactor,
    image_Factor: image_name,
  };
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/images/" + image_name, (err) => {
      if (err) return console.log(err);
      adminModel.insertFactor(objectImage, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const objectdata = {
            factor_ID: data.insertId,
            factor_Title: newFactorTitle,
            factor_Name: newFactor,
            image_Factor: image_name,
          };
          res.send(objectdata);
        }
      });
    });
  }
};

export const deleteFactor = (req,res)=>{
  let fID = req.params.id;
  console.log(fID)
  adminModel.deleteFactorbyId(fID,(err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
};


export const updateFactor = (req,res)=>{
  let fID = req.params.id;
  const newFactor = req.body.EditName;
  const newFactorTitle = req.body.EditTitle;
  const file = req.files.EditImage;
  const image_name = file.name;
  const obj = {
    factor_ID : fID,
    factor_Title: newFactorTitle,
    factor_Name: newFactor,
    image_Factor: image_name,
  };
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/images/" + image_name, (err) => {
      if (err) return console.log(err);
      adminModel.updateFactorbyId(obj, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // const objectdata = {
          //   Id: data.insertId,
          //   Factor_name: newFactor,
          //   Image_factor: image_name,
          // };
          console.log("update data: ",data)
          res.send(obj);
        }
      });
    });
  }
};