

const addToCartModel = require('../models/cartProduct')

const updateAddToCartProduct = async (req, res) => {


    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id
        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId },
            {
                quantity: qty
            }
        )



        res.json({
            message: "updated",
            data: updateProduct,
            error: false,
            success: true,

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

module.exports = updateAddToCartProduct