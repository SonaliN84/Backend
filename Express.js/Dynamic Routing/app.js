const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const db=require('./util/database')
const sequelize=require('./util/database')
const Product=require('./Models/product')
const User=require('./Models/user')
const Cart=require('./Models/cart')
const CartItem=require('./Models/cart-item')

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
//  .then((result)=>{
//     console.log(result)
//  })
//  .catch(err=>{
//     console.log(err)
//  })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
   User.findByPk(1)
   .then(user=>{
      req.user=user;
      next();
   })
   .catch(err=>{
      console.log(err)
   })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
//here product refers to the product that user adds into the shop as admin and not related to cart products
//onDelete:'CASCADE' means if we delete a user then any product associated with it would also get deleted.
User.hasMany(Product)


//this will add new field in Cart i.e. userId to which it belongs
User.hasOne(Cart);
Cart.belongsTo(User)

//many to many relationship
//a product belongs to multiple carts and a cart has multiple products
//this works when we have intermediate table that connects them which basically stores the combination of cartId and productId...and for that we have CartItem model here...using "through" we are telling sequelize where this connection to be stored
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem})


// sequelize.sync({force:true})
sequelize.sync()
.then((result) => {
  return User.findByPk(1)
})
.then((user)=>{
    if(!user){
     return User.create({
         name:'test',
         email:'test@test.com'
      })
    }
    return user;
    
   })
   .then(user=>{
      user.getCart()
      .then(cart=>{
         if(cart) //if cart already exist then there is no need to create again
         {
            return cart;
         }
         else{
            
            //to create cart for this user
            return user.createCart()
         }
      })

   })
   .then((cart)=>{
       app.listen(3000);

    })
  .catch((err) => {
   console.log(err) 
    });

