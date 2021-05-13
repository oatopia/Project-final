import express from 'express'
import {create, loginmember,loginowner} from '../controller/userController.js'
const router = express.Router();


router.post('/register',create);
router.post('/loginmember',loginmember);
router.post('/loginowner',loginowner);

export default router;

