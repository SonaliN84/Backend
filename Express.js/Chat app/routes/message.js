const express=require('express')
const fs=require('fs')
const router=express.Router();

router.get('/',(req,res)=>{
    fs.readFile('data.txt',{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.log(err)
            data='No chat exist'
        }

        res.send(`${data}<form onSubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST"><input type="text" name="message"/><input type="hidden" id="username" name="username"/><button type="submit">Send</button></form>`)
    })
})
router.post('/',(req,res)=>{
    console.log(req.body)
    const obj=`${req.body.username}:${req.body.message}`
    // fs.appendFileSync('data.txt',obj)
    // res.redirect('/')
    fs.writeFile('data.txt',obj,{flag:'a'},(err)=>{
        err ? console.log(err):res.redirect('/')
    })
})

module.exports=router;

