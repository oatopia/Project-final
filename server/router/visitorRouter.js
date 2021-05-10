import express from 'express'
import {getfactor,searchdorm } from '../controller/visitorController.js'
const router = express.Router();


router.get('/getfactor',getfactor);
router.post('/searchDorm',searchdorm );
// router.get('/search',getall);
export default router;
