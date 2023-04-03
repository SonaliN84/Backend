const express=require('express');
const path=require('path');

const rootDir=require('../util/path')
const router=express.Router();
//path='/admin/add-product'=>POST method
router.post('/add-product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})

//path='/admin/add-product'=>get method
router.get('/add-product',(req,res,next)=>{
    console.log("in the middleware 2")
    res.sendFile(path.join(rootDir,'Views','add-product.html'))
    // res.sendFile(path.join(__dirname,'../','Views','add-product.html'))
})

module.exports=router