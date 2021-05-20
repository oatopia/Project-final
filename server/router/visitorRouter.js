import express from 'express'
import {getfactor,searchdorm,matchDorm,calPriority,getDorm,getdetail} from '../controller/visitorController.js'
const router = express.Router();


router.get('/getfactor',getfactor);
router.post('/searchDorm',searchdorm );
router.post('/calPriority',calPriority);
router.post('/matchDorm',matchDorm);
router.get('/getdorm',getDorm);
router.get('/getdetail',getdetail);
export default router;
