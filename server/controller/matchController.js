import matchmodel from '../model/matchModel';

export const getall = (req,res) =>{
    matchmodel.getallfactor((err,data)=>{
        res.send(data);
        
    });
};