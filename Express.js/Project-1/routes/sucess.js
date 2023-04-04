const express=require('express')

const router=express.Router();
const sucessController=require('../controllers/success')
router.post('/sucess',sucessController.postSucess)
module.exports=router;