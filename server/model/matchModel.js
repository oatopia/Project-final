import con from '../config/config.js';
import db from '../util/database.js'

const Matching = function (e) {
    this.id = e.id;
    this.factorname = e.id;
    this.weight = e.weight;
}


Matching.getallfactor = result => {
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


Matching.createWeight = (newWeight, result) => {
    let nw = newWeight.data
    console.log('newWeight',newWeight)
    db.query("INSERT INTO weight (factor_ID,weight,index_Check,member_ID) VALUES ?", [nw.map(item => [item.factor_ID,item.weight,item.index_Check,newWeight.member_ID])], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("create weight success")
    });
}


Matching.getallDormScore = result => {
    db.query("SELECT * FROM Scoring_Factors ", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


Matching.getDormbyID = (Array_ID, result) => {
    console.log("in MatchModel:", Array_ID);
    db.query("SELECT * FROM dormitory WHERE Dorm_ID IN (" + db.escape(Array_ID) + ")", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Matching.getAllDorm = (result) => {
    db.query("SELECT * FROM dormitory ", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};


Matching.searchbyName = (name, result) => {
    db.query("SELECT * FROM dormitory WHERE dorm_Name = ?", name, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        } else {
            if (res.length > 0) {
               let dormid = res[0].dorm_ID
                db.query("SELECT * FROM image_dorm WHERE dorm_ID = ?;SELECT * FROM room WHERE dorm_ID = ?;SELECT * FROM facilities_dorm WHERE dorm_ID = ?", [dormid, dormid, dormid], (err, resall) => {
                    if (err) {
                        console.log("error:", err);
                        result(null, err);
                        return;
                    }
                    console.log("data from get all ", resall)
                    let payload = {
                        Dorm: res[0],
                        Image: resall[0],
                        Room: resall[1],
                        Facility: resall[2]
                    }
                    result(null, payload)
                })
            }else{
                result(null,"")
            }
        }
    });
};


Matching.getweightbyID = (member_ID, result) => {
    console.log('member_ID', member_ID)
    db.query("SELECT * FROM weight WHERE member_ID = ?;SELECT * FROM factor", member_ID, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Matching.updateweightbyID = (data, result) => {
    console.log("data for update",data);
    let update = data.data
    for (let i = 0; i < update.length; i++) {
        db.query("UPDATE weight SET factor_ID = ?, weight = ? WHERE weight_ID = ? AND index_Check = ? AND member_ID = ? ", [update[i].factor_ID, update[i].weight,update[i].weight_ID,update[i].index_Check, data.member_ID], (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err);
            }
            console.log("update complete at index_Check: ", update[i].index_Check)
        });
    }
    result("","update success")
};


Matching.getbookmarkbyID = (id, result) => {
    console.log("user ID for getbook", id)
    db.query("SELECT save.save_ID,dormitory.dorm_ID,dorm_Name, image , room_Price FROM save JOIN dormitory ON dormitory.dorm_ID=save.dorm_ID JOIN (SELECT * FROM image_dorm WHERE image_dorm.image_ID IN (SELECT min(image_ID) FROM image_dorm GROUP BY dorm_ID)) I ON I.dorm_ID = save.dorm_ID JOIN (SELECT * FROM room WHERE room_ID IN (SELECT min(room_ID) FROM room GROUP BY dorm_ID)) R ON R.dorm_ID = save.dorm_ID WHERE save.member_ID = ?", id, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        console.log("Result Get bookmark",res)
        result(null, res);
    });
};

Matching.createbookbyID = (newbook, result) => {
    db.query("INSERT INTO save SET member_ID = ?, dorm_ID = ?", [newbook.member_ID, newbook.dorm_ID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Matching.deletebookmarkbyID = (id, result) => {
    db.query("DELETE FROM save WHERE save_ID = ?", id, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            // return;
        }
        console.log("delete bookmark: ", res)
        result(null, res);
    });
};

Matching.getdormdata = (data,result) => {
    db.query("SELECT * FROM image_dorm ;SELECT * FROM room ;SELECT * FROM facilities_dorm; SELECT dorm_ID,save_ID FROM save WHERE member_ID = ?", data.member_ID,(err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        let payload = {
            dorm: data.Dorm,
            res:res
        }
        result(null, payload);
    });
};


Matching.checkdormbyID = (data,result) => {
    db.query("SELECT save_ID,dorm_ID FROM save WHERE member_ID = ? AND dorm_ID = ?",[data.member_ID,data.dorm_ID],(err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("Get data from select save by ID: ",res)
        result(null, res);
    });
};

Matching.getDormdetailbyID = (ID,result) => {
    db.query("SELECT * FROM dormitory WHERE dorm_ID = ?; SELECT * FROM image_dorm WHERE dorm_ID = ? ;SELECT * FROM room WHERE dorm_ID = ? ;SELECT * FROM facilities_dorm WHERE dorm_ID = ?",[ID,ID,ID,ID],(err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};



export default Matching;