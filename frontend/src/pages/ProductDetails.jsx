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
        setLoading(false)
        setData(response.data)
    }

    useEffect(() => {
        fetchProductDetail()
    }, [])


    return (


        <div className="containar p-4 mx-auto">
            <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">

                <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">

                    <div className="lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200">

                    </div>
                    <div className="h-full">
                        {
                            loading ? (
                                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                    {
                                        productImageListLoading.map(elx => {
                                            return (
                                                <div className="h-20 w-20 bg-slate-200 animate-pulse rounded" key={"loadingImage"}></div>
                                            )

                                        })
                                    }
                                </div>

                            ) :
                                (
                                    <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                        {
                                            data.productImage.map((imgURL,index) => {
                                                return (
                                                    <div  className="h-20 w-20 bg-slate-200 rounded p-1" key={imgURL}>
                                                        <img src={imgURL} className="h-full mix-blend-multiply w-full object-scale-down" alt="" />
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
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