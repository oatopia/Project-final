import db from '../util/database.js'

const Dorminfo = function(e) {
    this.Dorm_Name = e.Dorm_Name;
    this.Type_D = e.Type_D;
    this.Address = e.Address;
    this.Deposit = e.Deposit;
    this.Electric_Bill = e.Electric_Bill;
    this.Water_Bill = e.Water_Bill;
    this.Common_fee = e.Common_fee;
    this.Information = e.Information;
    this.L_name = e.L_name;
    this.Contact_Number = e.Contact_Number;
    this.E_mail = e.E_mail;
    this.Line_ID = e.Line_ID;
    this.Facilities = e.Facilities;

}

Dorminfo.createDorminfo = (newDorm,result) =>{
    db.query("INSERT INTO dormitory (Dorm_Name,Type_D,Address,Deposit,Electric_Bill,Water_Bill,Common_fee,Information,L_name,Contact_Number,E_mail,Line_ID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
    ,[newDorm.Dorm_Name,newDorm.Type_D,newDorm.Address,newDorm.Deposit,newDorm.Electric_Bill,newDorm.Water_Bill,
    newDorm.Common_fee,newDorm.Information,newDorm.L_name,newDorm.Contact_Number,newDorm.E_mail,newDorm.Line_ID],(err,res)=>{
        // db.query("INSERT INTO facilities SET ?",newDorm,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        let ID = res.insertId;
        db.query("INSERT INTO facilities (Dorm_ID,Type_F,Facility) VALUES ?",[newDorm.Facilities.map(item=>[ID,item.Type_F,item.Facility])],(err,res)=>{
            if(err){
                console.log("error: ",err);
            result(err,null);
            return;
            }
            console.log(res);
        })
        
    });
};

Dorminfo.createfacilitiesinfo = ([newfac],result)=>{
    db.query("INSERT INTO Facilities (Type_D,Facility) VALUES ?",[newfac.map(item=>[item.Type_D,item.Facility])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
    })
}



export default Dorminfo;