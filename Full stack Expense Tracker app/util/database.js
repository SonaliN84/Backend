const Sequelize=require('sequelize')

const sequelize=new Sequelize('first','root','asdf@#$%678',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;