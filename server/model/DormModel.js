import db from '../util/database.js'

const Dorminfo = function(e) {
    this.dorm_Name = e.dorm_Name;
    this.type_D = e.type_D;
    this.address = e.address;
    this.deposit = e.deposit;
    this.electric_Bill = e.electric_Bill;
    this.water_Bill = e.water_Bill;
    this.common_Fee = e.common_Fee;
    this.detail = e.detail;
    this.ad_Name = e.ad_Name;
    this.contact_Number = e.contact_Number;
    this.e_Mail = e.e_Mail;
    this.line_ID = e.line_ID;
    this.owner_ID = e.owner_ID;
}

Dorminfo.createDorminfo = (newDorm,result) =>{
        db.query("INSERT INTO dormitory SET ?",newDorm,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res);
    });
};

Dorminfo.createFac = (newfac,result)=>{
    const fac = newfac.facilities;
    console.log("data come",newfac)
    console.log("data in fac",fac)
    db.query("INSERT INTO facilities_dorm (dorm_ID,type_F,facility) VALUES ?",[fac.map(item=>[newfac.dorm_ID,item.type_F,item.facility])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
    })
}

Dorminfo.createImg = (newImg,result)=>{
    const img_name = newImg.Image_name
    db.query("INSERT INTO image_dorm (dorm_ID,image) VALUES ?",[img_name.map(item=>[newImg.dorm_ID,item])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
    })
}

Dorminfo.getdormbyID = (id,result)=>{
    db.query("SELECT * FROM dormitory WHERE owner_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.getdormdatabyID = (id,result)=>{
    db.query("SELECT * FROM dormitory WHERE dorm_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.getfacilitiesbyID = (id,result)=>{
    db.query("SELECT * FROM facilities_dorm WHERE dorm_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.getimagebyID = (id,result)=>{
    db.query("SELECT * FROM image_dorm WHERE dorm_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.deleteFacbyId = (fid,result) =>{
    db.query("DELETE FROM facilities_dorm WHERE f_ID = ?",fid,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        console.log("delete fac: ",res)
        result(null,res);    
    });
};

Dorminfo.addFac = (fac,result)=>{
    db.query("INSERT INTO facilities_dorm SET ?",fac,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("res insertID: ",res.insertId);
        result(null,res);
    })
}

export default Dorminfo;