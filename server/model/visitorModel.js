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
    db.query("SELECT * FROM dormitory WHERE Dorm_Name = ?", name, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        } else {
            if (res.length > 0) {
                console.log("Response in model", res);
                dormid = res[0].Dorm_ID;
                db.query("SELECT * FROM facilities WHERE Dorm_ID = ?", dormid, (err, resfac) => {
                    if (err) {
                        console.log("error:", err);
                        result(null, err);
                        return;
                    }
                    db.query("SELECT * FROM image_dorm WHERE Dorm_ID = ?", dormid, (err, resimg) => {
                        if (err) {
                            console.log("error:", err);
                            result(null, err);
                            return;
                        }
                        dormid = res[0].Dorm_ID;
                        console.log("image", resimg)
                        let payload = {
                            "information": res[0],
                            "facilities": resfac,
                            "image": resimg
                        }
                        console.log("payload dorm", payload)
                        result(null, payload);
                    })
                })
            }else{
                result(null,res);
            }
        }



    });
};

export default Visitormodel;

