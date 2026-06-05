import { useState } from "react"
import { useParams } from 'react-router-dom'

import axios from "axios"

const ProductDetails = () => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })


    const params = useParams()

    const fetchProductDetail = async () => {
        const response = await axios.post('http://localhost:3000/api/product-details', {
            productId=params?.id,


        }, {
            headers: {
                'Content-Type': 'application/json'

            }
        })

    }


}

export default ProductDetails