import express from 'express'
import {getall, createweight, matchDorm} from '../controller/matchController.js'
const router = express.Router();


router.get('/getfactor',getall);

router.post('/createweight',createweight);

router.post('/matchDorm',matchDorm);

export default router;
