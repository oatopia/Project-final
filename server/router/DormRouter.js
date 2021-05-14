import express from 'express'
import {createDorm, createFacilities, createImage ,getDorm,getDormDataByID,getFacilities,getImage,deletefacbyID,addfac} from '../controller/DormController.js'
const router = express.Router();
import {verifyToken} from '../middleware/Verify.js'
import upload from '../middleware/upload'

router.post('/getDorm',[verifyToken],getDorm);
router.post('/getDormdatabyId',[verifyToken],getDormDataByID);
router.post('/getFac',[verifyToken],getFacilities);
router.post('/getImg',[verifyToken],getImage);
router.post('/createDorm',[verifyToken],createDorm);
router.post('/createFacilities',[verifyToken],createFacilities);
router.post('/createImage',upload.array('Image'),createImage);
router.delete('/facdeleteDelete/:id',deletefacbyID);
router.post('/addfacil',[verifyToken],addfac);

export default router;
