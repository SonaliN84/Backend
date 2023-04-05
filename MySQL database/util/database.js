const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'first',
    password:'asdf@#$%678'
})

module.exports=pool.promise();