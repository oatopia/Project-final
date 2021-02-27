
import matchmodel from '../model/matchModel.js'

export const getall = (req,res) =>{
    matchmodel.getallfactor((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
         
        
    });
};

export const createweight = (req,res) =>{
    let jsondata = req.body;
    // let dataweight = [];
    // for (let i = 0; i < jsondata.length; i++) {
    //     dataweight.push(jsondata[i].Id,jsondata[i].Image,jsondata[i].Weight);
    // }
    // for(let i = 0;i<dataweight.length;i++){
    //     console.log(dataweight[i]+"5555555");
    // }
    matchmodel.createWeight([jsondata],(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
         
        
    });
};