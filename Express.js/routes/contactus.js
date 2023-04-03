const express=require('express')
const path =require('path');
const rootDir=require('../util/path')
const router=express.Router();

router.get('/contactus',(req,res)=>{
    res.sendFile(path.join(rootDir,'Views','contact.html'))
})
// router.post('/contactus',(req,res)=>{
//     res.redirect('/sucess')
// })
module.exports=router;