const SellerProduct=require('../models/seller-product')


exports.getProducts=(req,res,next)=>{
   SellerProduct.findAll()
   .then(result=>{
    res.json(result)
   })
   .catch(err=>{
    console.log(err)
   })
}

exports.postProduct=(req,res,next)=>{
    const ProductName=req.body.ProductName;
    const ProductPrice=req.body.ProductPrice;
    SellerProduct.create({
        ProductName:ProductName,
        ProductPrice:ProductPrice
    })
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.deleteProduct=(req,res,next)=>{
    const productId=req.params.productId;

    SellerProduct.findByPk(productId)
    .then(product=>{
        product.destroy()
    })
    .catch(err=>{
        console.log(err)
    })
}