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