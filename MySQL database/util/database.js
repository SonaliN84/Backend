const Sequelize=require('sequelize')

const sequelize=new Sequelize('first','root','asdf@#$%678',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;










// const mysql=require('mysql2')

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'first',
//     password:'asdf@#$%678'
// })

// module.exports=pool.promise();