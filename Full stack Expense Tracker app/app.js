const express = require('express');

const bodyParser = require('body-parser');

const sequelize=require('./util/database')

const expenseRoutes=require('./routes/expense')

const app=express();

var cors = require('cors')

 
app.use(cors())

app.use(bodyParser.json({ extended: false }));

app.use(expenseRoutes)

sequelize.sync().then((result) => {
//    console.log(result) 
   app.listen(3000);
}).catch((err) => {
   console.log(err) 
    
});

