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