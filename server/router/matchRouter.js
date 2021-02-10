import express from 'express'
import {getall} from '../controller/matchController.js'
const router = express.Router();


router.get('/getfactor',getall);

export default router;
