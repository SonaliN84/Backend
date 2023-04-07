const Product = require('../Models/product');
const Cart =require('../Models/cart')
exports.getProducts = (req, res, next) => {
//to get all products in table use findAll() in sequelize
  Product.findAll().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>{
      console.log(err)
    });
}


exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  console.log(prodId)
  // //to get single product we can use findAll() with WHERE query
  // Product.findAll({where:{id:prodId}})//findAll() returns array
  // .then(products=>{
  //   res.render('shop/product-detail',{
  //     product:products[0],
  //     pageTitle:'product',
  //     path: '/products'
  //   })
  // })
  // .catch(err=>{
  //   console.log(err)
  // });

  //to get single product use findByPk() in sequelize 
  Product.findByPk(prodId)
  .then((product)=>{
    
    res.render('shop/product-detail',{
      product:product,
      pageTitle:'product',
      path: '/products'
    })
  })
  .catch(err=>{
    console.log(err)
  });
  
}

exports.getIndex = (req, res, next) => {
   
  Product.findAll().then(products=>{
    
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/'
        
      })
      .catch(err=>{
          console.log(err)
        });
  })


  // Product.fetchAll()
  // .then(([rows,fieldData])=>{
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   })
  // })
  // 
 
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  let newQuantity=1;
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart;
    return cart.getProducts({where:{id:prodId}})
  })
  .then(products=>{
    let product;
    if(products.length>0){
      product=products[0];
    }
    if(product){
      //...if product is already in the cart then we have to increase its quantity
      const oldQuantity=product.cartItem.quantity;
      newQuantity=oldQuantity+1;
      return product;
    }
    return Product.findByPk(prodId) //if product is not already present the cart then we have to add it to cart for that we first find/get that product from the product table
      
      
    })
    .then(product=>{
    //to add product in the cart///addProduct()/add....() is method given by sequelize for many to many relationships....this will add this cartId and productId combination entry into the in-between CartItem table
    return fetchedCart.addProduct(product,{through:{quantity:newQuantity}}) 
    })
   .then(()=>{
    res.redirect('/cart')
    })

   .catch(err=>{
    console.log(err)
  })
}

exports.getCart = (req, res, next) => {
//this will give us a cart which is associated with the user
  req.user.getCart()
  .then(cart=>{  
    console.log(cart)
    return cart.getProducts()  //to get all the products that belongs to that cart here sequelize use CartItem table to    find that
    
    .then(products=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products
      });
    })
    .catch(err=>{
      console.log(err)
    })
  })
  
  .catch(err=>{
    console.log(err)
  })

 
};

///to delete a product in cart of user
exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  req.user.getCart()
  .then(cart=>{
   return cart.getProducts({where:{id:prodId}})
  })
  .then(products=>{
    const product=products[0];
    product.cartItem.destroy();//we want to remove the product from cart i.e.from that in-between cartItem table and not from products list
  })
  .then(result=>{
    res.redirect('/cart')
  })
  .catch(err=>{
    console.log(err)
  })

  
}


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


