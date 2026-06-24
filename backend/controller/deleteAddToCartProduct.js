

const addToCartModel = require('../models/cartProduct')
const deleteAddToCartProduct = async (req, res) => {


    try {

        const currentUser = req.userId
        const addToCartProductId = req.body._id


        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId })
        res.json({
            message: "product deleted",
            success: true,
            error: fasle,
            data: deleteProduct
        })
    }

    catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })

    }

}


module.exports = deleteAddToCartProduct