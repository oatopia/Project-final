import express from 'express'
import {createDorm, createfacilities} from '../controller/DormController.js'
const router = express.Router();


router.post('/createDorm',createDorm);
router.post('/facilities',createfacilities);

export default router;
