import express from 'express'
import {getUser,getFactor,deleteMember,deleteOwner,createFactor,deleteFactor,updateFactor} from '../controller/adminController.js'
// import {upload} from '../middleware/upload.js'
const router = express.Router();


router.get('/user',getUser);
router.get('/factor',getFactor);
router.delete('/memberDelete/:id',deleteMember);
router.delete('/ownerDelete/:id',deleteOwner);
// router.post('/saveFactor',upload.single("ImageFactor"),createFactor);
router.post('/saveFactor',createFactor);
router.delete('/factorDelete/:id',deleteFactor);
router.put('/updateFactor/:id',updateFactor);


export default router;
