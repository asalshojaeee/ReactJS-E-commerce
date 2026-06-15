const express = require('express');
const routes=express.Router();

const userDetails = require('../controller/userDetail')
const userSignUp = require('../controller/userSignUp')
const userSignIn = require('../controller/userSignIn')
const allUsers = require('../controller/allusers')
const authTokenController = require('../middleware/authToken');
const uploadProductController = require('../controller/uploadProduct');
const getProductContrroler = require('../controller/getProduct');
const userLogOut = require('../controller/userLogOut');
const updateUser = require('../controller/updateUser');
const getCategoryWiseProduct=require('../controller/getCategoryWiseProduct')
const getCategoryProduct=require('../controller/getCategoryProduct');
const updateProductController = require('../controller/updateProduct');
const getProductDetails = require('../controller/getProductDetails');
const addToCartController= require('../controller/addToCartController')



const countAddToCartProduct = require('../controller/countAddToCartProduct')
routes.post("/signup",userSignUp)
routes.post("/signin",userSignIn)
routes.get("/user-details",authTokenController,userDetails)
routes.get('/userlogout',userLogOut)
routes.get('/allusers',authTokenController,allUsers);
routes.post('/updateuser',authTokenController,updateUser);
routes.post('/upload-product',authTokenController,uploadProductController);
routes.get('/get-product',getProductContrroler)
routes.put('/update-product',authTokenController,updateProductController)

routes.get('/get-categoryProduct',getCategoryProduct);
routes.post('/category-product',getCategoryWiseProduct);

routes.post('/product-details',getProductDetails);

routes.post('/addtocart',authTokenController,addToCartController)


routes.get('/countAddToCartProduct',authTokenController,countAddToCartProduct)

module.exports=routes