import db from '../util/database.js'
const Visitormodel = () => {}

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
    db.query("SELECT * FROM dormitory WHERE Dorm_Name = ?", name, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

export default Visitormodel;

