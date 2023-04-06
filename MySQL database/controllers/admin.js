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
  //to add new product in a table and also that product should have association with user...i.e. it should has userId of ther user it belongd to..we use createProduct() method where "Product" in createProduct refers to Product model
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
  })
  /////OR/////
  //to add new product to table use create() in sequelize
//  Product.create({
//   title:title,
//   price:price,
//   imageUrl:imageUrl,
//   description:description,
//   // userId:req.user.id
//  })
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
 //here we are finding product by id but only products that are associated with that user

  req.user.getProducts({where:{id:prodId}})//getProducts() will give array
  .then(products=>{
    const product=products[0];
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
  // /////OR///here we are finding product by id in all products list//this also works
  // Product.findByPk(prodId).then(product=>{ 
  //   if(!product){
  //     return res.redirect('/')
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Add Product',
  //     path: '/admin/edit-product',
      
  //     editing:editMode,
  //     product:product
  //   });
  // })
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
  // //this will give us all the products in product table but we want products of that user only hence we will use another approach.
  // Product.findAll().then((products)=>{
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // })

  req.user.getProducts()
  .then((products)=>{
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