const Sequelize=require('sequelize');

const sequelize=require('../util/database')

const SellerProduct=sequelize.define('sellerproduct',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    ProductName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ProductPrice:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }

})

module.exports=SellerProduct;