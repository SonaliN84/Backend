const express=require('express')

const router=express.Router();

router.post('/sucess',(req,res)=>{
    res.send('<h1>Form sucessfully filled</h1>')
})
module.exports=router;