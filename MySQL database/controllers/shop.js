const Product = require('../Models/product');
const Cart =require('../Models/cart')
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>{
    console.log(err)
  });
   
};

exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  console.log(prodId)
  Product.findById(prodId)
  .then(([product])=>{
    
    res.render('shop/product-detail',{
      product:product[0],
      pageTitle:'product',
      path: '/products'
    })
  })
  
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err=>{
    console.log(err)
  });
 
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
