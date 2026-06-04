


const getProductDetails=(req,res)=>{
    try{

    }
    catch(err){

        res.json({
            message:err?.message || err,
            success:false,
            error:true
        })

    }
}