import express from 'express'
import {getUser,getFactor,deleteUser,createFactor} from '../controller/adminController.js'
const router = express.Router();


router.get('/user',getUser);
router.get('/factor',getFactor);
router.delete('/userDelete/:id',deleteUser);
router.post('/saveFactor',createFactor);
export default router;
