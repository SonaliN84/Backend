const express =require('express')

const router=express.Router();

router.get('/',(req,res,next)=>{
    console.log("in the middleware 1")
    res.send('<h1>Hello</h1>')
    // next();
})

module.exports=router;

