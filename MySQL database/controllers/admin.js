const Product = require('../Models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //to add new product to table use create() in sequelize
 Product.create({
  title:title,
  price:price,
  imageUrl:imageUrl,
  description:description
 })
 .then((resullt)=>{
  console.log(resullt)
  res.redirect('/admin/products')
 })
 .catch(err=>{
  console.log(err)
 })
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }

  const prodId=req.params.productId;
  Product.findByPk(prodId).then(product=>{
    if(!product){
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      
      editing:editMode,
      product:product
    });
  })
  .catch(err=>{
    console.log(err)
   })
   
  }
 


exports.postEditProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedprice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updateddesc=req.body.description;

 Product.findByPk(prodId)
 .then(product=>{
   ///we are updating product locally not at database
    product.title=updatedTitle;
    product.price=updatedprice;
    product.imageUrl=updatedImageUrl;
    product.description=updateddesc;
    //to update the product at database also use save() 
    return product.save(); //product.save() returns a promise
 })
 .then((result)=>{
   console.log("product updated")
   res.redirect('/admin/products')
 })
 .catch(err=>{
  console.log(err)
 })

}

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
    
 
};

// exports.getDeleteProduct=(req,res,next)=>{
//   const prodId=req.params.productId;
//   console.log(prodId)
//   Product.deleteProductById(prodId);
//   res.redirect('/')
// }

exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findByPk(prodId)
  .then((product)=>{
    //to delete a product from database use destroy()
     return product.destroy()
    
  })
  .then(result=>{
    console.log("destroyed")
    res.redirect('/admin/products')
  })
  .catch(err=>{
    console.log(err)
   })
  

}