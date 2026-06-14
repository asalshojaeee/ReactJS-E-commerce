const { model } = require("mongoose")
const addToCartModel = require("../models/cartProduct")


const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId


        const isProductAvailble = await addToCartModel.findOne({ productId })
        if (isProductAvailble) {
            return res.json(
                {
                    message: "Already exists in cart",
                    success: false,
                    error: true
                }
            )
        }

        const pyload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }


        const newAddToCart = new addToCartModel(pyload)
        const saveProduct = await newAddToCart.save()



        res.json({
            data:saveProduct,
            message:"product added in cart",
            success:true,
            error:false
        })


    }
    catch (err) {
        res.json({
            message: err?.message,
            error: true,
            success: false
        })
    }

}


module.exports=addToCartController