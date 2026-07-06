import { use, useEffect, useState } from "react"
import UploadProduct from "../components/UploadProduct"

import AdminProductCart from '../components/AdminProductCart'

export const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);


    const fetchAllProduct = async () => {
        const response = await fetch('http://localhost:3000/api/get-product', {
            method: 'get',
            credentials: "include",


        })

        const dataResponse = await response.json();
        setAllProduct(dataResponse?.data || []);

    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <>


            <div>
                <div className="bg-white py-2 px-4 flex justify-between items-center" >
                    <h2 className="font-bold text-lg">All Product</h2>
                    <button className="border-2 border-blue-800 text-orange-400 py-1 px-3 rounded-full"

                        onClick={() => (setOpenUploadProduct(true))}

                    >Upload Product</button>
                </div>

                <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
                    {allProduct.map((product, index) => {
                        return (
                            <AdminProductCart data={product} key={index + "Allproduct"} fetchData={fetchAllProduct} />


                        )

                    })}



                </div>



                {
                    openUploadProduct && (
                        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />

                    )
                }
            </div>
        </>
    )

}

