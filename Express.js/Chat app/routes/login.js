const express=require('express')

const routes=express.Router();

routes.get('/login',(req,res,next)=>{
   res.send('<form onsubmit="localStorage.setItem(`username`,document.getElementById(`username`).value)" action="/login" method="POST"><input type="text" id="username" name="title"/><button type="submit">submit</button></form>')
})

{/* <form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/product" method="POST"> */}
routes.post('/login',(req,res,next)=>{
   console.log(req.body.username)

   res.redirect('/')
 })

module.exports=routes;