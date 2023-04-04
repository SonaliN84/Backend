// const http=require('http');

const express=require('express')
const path=require('path')
const app=express();

const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop')
const contactusRoutes=require('./routes/contactus')
const sucessRoutes=require('./routes/sucess')

const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))


app.use('/admin',adminRoutes)
app.use(shopRoutes)
app.use(contactusRoutes)
app.use(sucessRoutes)

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'Views','404.html'))
})




app.listen(3000);
// const server=http.createServer(app)

// server.listen(3000);
