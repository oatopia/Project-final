import dormModel from '../model/DormModel.js'

export const createDorm = (req,res) =>{

    const Dorm = new dormModel({
        Dorm_Name: req.body.Dorm_Name,
        Type_D: req.body.Type_D,
        Address: req.body.Address,
        Deposit: req.body.Deposit,
        Electric_Bill: req.body.Electric_Bill,
        Water_Bill: req.body.Water_Bill,
        Common_fee: req.body.Common_fee,
        Information: req.body.Information,
        L_name: req.body.L_name,
        Contact_Number: req.body.Contact_Number,
        E_mail: req.body.E_mail,
        Line_ID: req.body.Line_ID,
        // Facilities: [req.body.Facilities],
        // Image: imagename
    });
    dormModel.createDorminfo(Dorm,(err,data)=>{
        if(err){
            res.status(500).send({
                message:
                err.message 
            })
        }else{
            res.send(data);
            
        }
            
    });
};


export const createFacilities = (req,res) =>{
    const id = req.body.Dorm_ID;
    const jsondata = req.body.Facilities;
    const object = {
        Dorm_ID: id,
        Facilities: jsondata
    }
    dormModel.createFac(object,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }      
    });
};


export const createImage = (req,res) =>{
    const id = req.body.Dorm_ID;
    const imagename = [];
    const file = req.files.Image;
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
    const object = {
        Dorm_ID: id,
        Image_name:imagename 
    }
    dormModel.createImg(object,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }      
    });
};