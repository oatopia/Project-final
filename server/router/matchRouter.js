import express from 'express'
import {getall, createweight, matchDorm, searchDorm , getWeight ,updateWeight,getBookmark,createBook,deleteBook,calPriority,getDorm,checkbook,getDormdetail} from '../controller/matchController.js'
const router = express.Router();
import {verifyToken} from '../middleware/Verify.js'


router.get('/getfactor',[verifyToken],getall);

router.post('/createweight',[verifyToken],createweight);

router.post('/matchDorm',[verifyToken],matchDorm);

router.post('/calPriority',[verifyToken],calPriority);

router.post('/searchDorm',[verifyToken],searchDorm);

router.post('/getdorm',[verifyToken],getDorm);

router.post('/getWeight',[verifyToken],getWeight);

router.put('/editWeight',[verifyToken],updateWeight);

router.post('/getBookmark',[verifyToken],getBookmark);

router.post('/createbook',[verifyToken],createBook);

router.delete('/deletebook/:id',[verifyToken],deleteBook);

router.post('/checkbookmark',[verifyToken],checkbook);

router.post('/getDormDetail',[verifyToken],getDormdetail);

export default router;
