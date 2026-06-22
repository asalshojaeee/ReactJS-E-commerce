



const updateAddToCartProduct = async (req, res) => {


    try {
        const currentUserId = req.userId
    }

    catch (err) {
        res.json({
            message: err?.message,
            error: true,
            success: false

        })
    }


}