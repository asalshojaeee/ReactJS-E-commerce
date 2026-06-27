

const productModel = require('../models/productModel')
const searchProduct = async (req, res) => {
    try {


        const query = req.query.q

        const regesx = new RegExp(query, "i")


        const product = await productModel.find({
            "$or": [
                {
                    productName: regesx
                },
                {
                    category: regesx
                }
            ]
        })

        res.json({
            data: product,
            message: "serach product list",
            success: true,
            error: false
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


module.exports = searchProduct