import express from 'express'
import {getall, createweight, matchDorm, searchDorm , getWeight} from '../controller/matchController.js'
const router = express.Router();
import {verifyToken} from '../middleware/Verify.js'


router.get('/getfactor',[verifyToken],getall);

router.post('/createweight',[verifyToken],createweight);

router.post('/matchDorm',[verifyToken],matchDorm);

router.post('/searchDorm',[verifyToken],searchDorm);

router.post('/getWeight',[verifyToken],getWeight);

export default router;
