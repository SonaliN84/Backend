const express=require('express');

const app=express();

const bodyParser=require('body-parser');

const loginRoutes=require('./routes/login')
const messageRoutes=require('./routes/message')
app.use(bodyParser.urlencoded({extended:false}))

app.use(loginRoutes)
app.use(messageRoutes)



app.listen(4000)