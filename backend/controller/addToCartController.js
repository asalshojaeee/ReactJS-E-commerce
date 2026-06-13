

const addToCartController = (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

    }
    catch (err) {
        res.json({
            message: err?.message,
            error: true,
            success: false
        })
    }

}