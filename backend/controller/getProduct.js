

const productModel = require('../models/productModel')

const getProductContrroler = async (req, res) => {

    try {

        const allProduct=await productModel.find().sort({createAt:-1});
        res.json({
            message:"all product",
            success:true,
            error:false,
            data:allProduct
        })

    }

    catch (err) {


        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })

    }


}

module.exports=getProductContrroler