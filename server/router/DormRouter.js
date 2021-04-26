import express from 'express'
import {createDorm, createFacilities, createImage} from '../controller/DormController.js'
const router = express.Router();


router.post('/createDorm',createDorm);
router.post('/createFacilities',createFacilities);
router.post('/createImage',createImage);

export default router;
