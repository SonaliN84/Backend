// const http=require('http');

const express=require('express')

const app=express();

const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

app.post('/product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})
app.use('/add-product',(req,res,next)=>{
    console.log("in the middleware 2")
    res.send('<form action="/product" method="POST">title<input type="text" name="title"/>size<input type="text" name="size"/><button type="submit">Submit</button></form>')
})
app.use('/',(req,res,next)=>{
    console.log("in the middleware 1")
    res.send('<h1>Hello</h1>')
    // next();
})


app.listen(3000);
// const server=http.createServer(app)

// server.listen(3000);
