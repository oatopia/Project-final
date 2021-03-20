
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
    matchmodel.createWeight([jsondata],(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
         
        
    });
};


export const matchDorm = (req,res) =>{
    let jsondata = req.body;
    let weightData = [];
    for (let i = 0; i < jsondata.lenght; i++) {
        for (let j = 0; j < jsondata.lenght; j++) {
            if(jsondata[j].Id == i){
                weightData.push(jsondata[j]);                                                                                                                                         
            }
            
        }
        
    }


    let matrixArray = [5];
    // let dataweight = [];
    // for (let i = 0; i < jsondata.length; i++) {
    //     dataweight.push(jsondata[i].Id,jsondata[i].Image,jsondata[i].Weight);
    // }
    // for(let i = 0;i<dataweight.length;i++){0
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