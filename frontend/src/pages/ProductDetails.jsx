import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import axios from "axios"

const ProductDetails = () => {
    const [loading, setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null);

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
        setLoading(true)
        const response = await axios.post('http://localhost:3000/api/product-details', {
            productId: params?.id


        }

        )
        // setLoading(false)
        setData(response.data)
    }

    useEffect(() => {
        fetchProductDetail()
    }, [])


    return (


        <div className="containar p-4 mx-auto">
            <div className=" min-h-[200px]">

                <div>
                    <div className="h-96">
                        {
                            loading ? (
                                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                    {
                                        productImageListLoading.map((el, index) => {
                                            return (
                                                <div className="h-20 w-20 bg-slate-200 rounded"></div>
                                            )

                                        })
                                    }
                                </div>

                            ) :
                                (
                                    <div></div>
                                )
                        }
                    </div>
                </div>



                <div>

                </div>
                <div>

                </div>

            </div>
        </div>
    )


}

export default ProductDetails