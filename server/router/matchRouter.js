import express from 'express'
import {getall, createweight, matchDorm, searchDorm} from '../controller/matchController.js'
const router = express.Router();


router.get('/getfactor',getall);

router.post('/createweight',createweight);

router.post('/matchDorm',matchDorm);

router.post('/searchDorm',searchDorm);

export default router;
