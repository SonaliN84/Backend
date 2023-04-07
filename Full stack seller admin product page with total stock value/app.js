const express=require('express');

const bodyParser=require('body-parser');

const sequelize=require('./util/database')

const sellerProductRoutes=require('./routes/seller-product')

const app=express();

var cors=require('cors');

app.use(cors());

app.use(bodyParser.json({extended:false}));


app.use(sellerProductRoutes)



sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})

