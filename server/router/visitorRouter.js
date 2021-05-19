import express from 'express'
import {getfactor,searchdorm,matchDorm,calPriority} from '../controller/visitorController.js'
const router = express.Router();


router.get('/getfactor',getfactor);
router.post('/searchDorm',searchdorm );
router.post('/calPriority',calPriority);
router.post('/matchDorm',matchDorm);
// router.get('/search',getall);
export default router;
