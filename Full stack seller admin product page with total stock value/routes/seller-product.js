const express=require('express');

const router=express.Router();

const productController=require('../controller/seller-product');

router.get('/product',productController.getProducts);
router.post('/product',productController.postProduct);
router.delete('/delete-product/:productId',productController.deleteProduct);

module.exports=router;