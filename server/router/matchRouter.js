import express from 'express'
import {getall, createweight} from '../controller/matchController.js'
const router = express.Router();


router.get('/getfactor',getall);

router.post('/createweight',createweight);

export default router;
