import adminModel from '../model/adminModel.js'

export const getUser = (req,res)=>{
    adminModel.getallUser((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
};


export const getFactor = (req,res)=>{
  adminModel.getallfactor((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
};

export const deleteUser = (req,res)=>{
  let uID = req.params.id;
  console.log(uID)
  adminModel.deleteUserbyId(uID,(err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
};