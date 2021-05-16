import path from 'path'
import multer from 'multer'

const imageFilter= (req,file,cb)=>{
   if(file.mimetype.startsWidth("image")){
      cb(null,true);
   }else{
      cb("Please upload only images",false);
   }
}

const storage = multer.diskStorage({
    destination: "../public/img_Dorm/",
    filename: (req, file, cb)=>{
       cb(null,file.originalname);
    }
  });

export const upload = multer({
    storage: storage,
    fileFilter: imageFilter
 });

 