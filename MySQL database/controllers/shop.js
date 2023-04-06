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
  console.log(prodId)
  Product.findById(prodId,(product)=>{
    Cart.addProduct(product.id,product.price)
  })
  res.redirect('/cart')
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

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
