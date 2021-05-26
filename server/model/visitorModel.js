import db from '../util/database.js'
const Visitormodel = () => { }

Visitormodel.getallfactor = result => {
    db.query("SELECT * FROM factor ", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Visitormodel.searchbyName = (name, result) => {
    let dormid = 0;
    db.query("SELECT * FROM dormitory WHERE dorm_Name = ?", name, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        } else {
            if (res.length > 0) {
                dormid = res[0].dorm_ID;
                db.query("SELECT * FROM image_dorm WHERE dorm_ID = ?;SELECT * FROM room WHERE dorm_ID = ?;SELECT * FROM facilities_dorm WHERE dorm_ID = ?", [dormid,dormid,dormid], (err, resall) => {
                    if (err) {
                        console.log("error:", err);
                        result(null, err);
                        return;
                    }
                    let payload = {
                        Dorm:res[0],
                        Image:resall[0],
                        Room:resall[1],
                        Facility:resall[2]
                    }
                    result(null,payload)
                })
            }else{
                result(null,"");
            }
        }



    });
};



Visitormodel.getAllDorm = (result) =>{
    db.query("SELECT * FROM dormitory ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }
        console.log(res);
        result(null,res);    
    });
};

Visitormodel.getalldetail = (result) =>{
    db.query("SELECT * FROM image_dorm ; SELECT * FROM room ; SELECT * FROM facilities_dorm",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }
        result(null,res);    
    });
};





export default Visitormodel;

