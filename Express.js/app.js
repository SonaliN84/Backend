// const http=require('http');

const express=require('express')

const app=express();

app.use((req,res,next)=>{
    console.log("in the middleware 1")
    next();
})
app.use((req,res,next)=>{
    console.log("in the middleware 2")
    res.send('<h1>Hello</h1>')
})

app.listen(3000);
// const server=http.createServer(app)

// server.listen(3000);
