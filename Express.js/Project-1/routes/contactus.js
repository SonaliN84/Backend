const express=require('express')

const router=express.Router();

const contactusController=require('../controllers/contactus')
router.get('/contactus',contactusController.contactusController)
// router.post('/contactus',(req,res)=>{
//     res.redirect('/sucess')
// })
module.exports=router;