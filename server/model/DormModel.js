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
        console.log("create dorm success this data from database: ",res);
        result(null,res);
    });
};

Dorminfo.createFac = (newfac,result)=>{
    const fac = newfac.facilities;
    console.log("data facilities from controller: ",fac)
    db.query("INSERT INTO facilities_dorm (dorm_ID,type_F,facility) VALUES ?",[fac.map(item=>[newfac.dorm_ID,item.type_F,item.facility])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("create facilities success this data from database: ",res);
    })
}

Dorminfo.createImg = (newImg,result)=>{
    const img_name = newImg.image_Name
    console.log("Array image name: ",img_name)
    db.query("INSERT INTO image_dorm (dorm_ID,image) VALUES ?",[img_name.map(item=>[newImg.dorm_ID,item])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("create image name success, this data get after success: ",res);
    })
}

Dorminfo.getdormbyID = (id,result)=>{
    db.query("SELECT * FROM dormitory WHERE owner_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("get dorm by ID success");
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
        console.log("get dorm by ID success");
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
        // console.log(res);
        console.log("get facilities by ID success");
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
        // console.log(res);
        console.log("get image by ID success");
        result(null,res)
    })
}

Dorminfo.deleteFacbyId = (fid,result) =>{
    db.query("DELETE FROM facilities_dorm WHERE f_ID = ?",fid,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }else{
            console.log("Delete facilities success!!!")
            result(null,res);
        }
            
    });
};

Dorminfo.addFac = (fac,result)=>{
    db.query("INSERT INTO facilities_dorm SET ?",fac,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("Add facilities success!!!,This is Facilities ID: ",res.insertId)
        result(null,res);
    })
}

Dorminfo.deleteImagebyID = (imageID,result) =>{
    db.query("DELETE FROM image_dorm WHERE image_ID = ?",imageID,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        console.log("Delete Image success!!!")
        result(null,res);    
    });
};

Dorminfo.updateDormbyID = (dorm,result)=>{
    console.log("id dorm:",dorm.dorm_ID)
    db.query("UPDATE dormitory SET dorm_Name = ?, type_D = ?, address = ?, deposit = ?, electric_Bill= ?, water_Bill = ?, common_Fee = ?, detail = ?, ad_Name = ?, contact_Number = ?, e_Mail = ?, line_ID = ? WHERE dorm_ID = ? ",
    [dorm.dorm_Name,dorm.type_D,dorm.address,dorm.deposit,dorm.electric_Bill,dorm.water_Bill,dorm.common_Fee,dorm.detail,dorm.ad_Name,dorm.contact_Number,dorm.e_Mail,dorm.line_ID,dorm.dorm_ID],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("Update dorm success!!!,response: ")
        result(null,res);
    })
}


Dorminfo.createroombyID = (newroom,result)=>{
    db.query("INSERT INTO room (room_Type,room_Price,dorm_ID) VALUES ?",[newroom.room.map(item=>[item.room_Type,item.room_Price,newroom.dorm_ID])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("create room success this data from database: ");
    })
}


Dorminfo.getroombyID = (id,result)=>{
    db.query("SELECT * FROM room WHERE dorm_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        // console.log(res);
        console.log("get room by ID success");
        result(null,res)
    })
}

export default Dorminfo;