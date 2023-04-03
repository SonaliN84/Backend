const express=require('express');

const router=express.Router();
//path='/admin/add-product'=>POST method
router.post('/add-product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})

//path='/admin/add-product'=>get method
router.get('/add-product',(req,res,next)=>{
    console.log("in the middleware 2")
    res.send('<form action="/admin/add-product" method="POST">title<input type="text" name="title"/>size<input type="text" name="size"/><button type="submit">Submit</button></form>')
})

module.exports=router