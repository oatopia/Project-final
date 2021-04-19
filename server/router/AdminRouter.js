import express from 'express'
import {getUser,getFactor,deleteUser} from '../controller/adminController.js'
const router = express.Router();


router.get('/user',getUser);
router.get('/factor',getFactor);
router.delete('/userDelete/:id',deleteUser);
export default router;
