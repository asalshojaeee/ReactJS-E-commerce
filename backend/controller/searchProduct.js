


const searchProduct = async (req, res) => {
    try {


        const query = req.query.q
    }
    catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}


module.exports=searchProduct