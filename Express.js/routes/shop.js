const path=require('path')

const express =require('express')

const rootDir=require('../util/path')

const router=express.Router();

router.get('/',(req,res,next)=>{
    console.log("in the middleware 1")
    res.sendFile(path.join(rootDir,'Views','shop.html'))
    // res.sendFile(path.join(__dirname,'../','Views','shop.html'))
    // next();
})

module.exports=router;

