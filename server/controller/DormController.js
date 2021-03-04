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
        Facilities: req.body.Facilities
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


export const createfacilities = (req,res) =>{
    let jsondata = req.body;
    dormModel.createfacilitiesinfo([jsondata],(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
         
        
    });
};