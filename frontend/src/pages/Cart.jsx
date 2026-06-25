import { useEffect, useState } from "react"
import { useContext } from "react"
import Header from '../components/Header'
import { FaS } from "react-icons/fa6"
import Context from "../context"

import { MdDelete } from "react-icons/md";

import displayCurrency from '../helpers/displayCurrency'
const Cart = () => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)


    const contex = useContext(Context)

    const loadingCart = new Array(contex.cartProductCount).fill(null)
    const fetchData = async () => {
        setLoading(true)
        const response = await fetch('http://localhost:3000/api/veiwCartProduct', {
            method: "get",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },


        })


        setLoading(false)
        const responseData = await response.json()
        if (responseData.success) {
            setData(responseData.data)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])
    const increaseQuantity = async (id, qty) => {
        const response = await fetch('http://localhost:3000/api/update-cart-product', {
            method: 'post',
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,

                    quantity: qty + 1

                }
            )


        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }


    const decreaseQuantity = async (id, qty) => {
        const response = await fetch('http://localhost:3000/api/update-cart-product', {
            method: 'post',
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,

                    quantity: qty - 1

                }
            )


        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }



    const deleteProduct = async (id) => {

        const response = await fetch('http://localhost:3000/api/deletecart-product', {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,

            })
        })
        const dataResponse = await response.json()
        if (dataResponse.success) {
            fetchData()
        }
    }

    return (
        <>
            <Header />
            <div className="">

                <div className="text-center text-lg ">
                    {
                        data.length === 0 && !loading && (
                            <p className="bg-white py-5">No data</p>

                        )
                    }
                </div>


                <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                    <div className="w-full max-w-3xl">
                        {
                            loading ? (
                                loadingCart.map((el, index) => {

                                    return (
                                        <div key={el + "add to cart loading"} className="w-full bg-slate-200 h-32 my-2 animate-pulse rounded-md">


                                        </div>
                                    )

                                })

                            )

                                : (
                                    data.map((product, index) => {

                                        return (
                                            <div key={product?._id + "add to cart loading"} className="w-full bg-white min-h-32 my-2 rounded-md grid grid-cols-[128px,1fr]">
                                                <div className="w-32 h-32">
                                                    <img src={product?.productId?.productImage[0]} alt="" className="h-full w-full object-scale-down mix-blend-multiply" />
                                                </div>
                                                <div className="py-2 px-4 relative">
                                                    <div
                                                        onClick={() => deleteProduct(product?._id)}

                                                        className="absolute right-0 text-red-600 p-2 hover:bg-red-600 hover:text-white rounded-full text-xl cursor-pointer">
                                                        <MdDelete />


                                                    </div>
                                                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                                                    <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                                                    <p className="font-medium text-slate-400">{displayCurrency(product?.productId.sellingPrice)}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <button className="rounded hover:text-white hover:bg-red-600 flex justify-center items-center border border-red-600 text-red-600 w-6 h-6" onClick={() => decreaseQuantity(product?._id, product?.quantity)}>-</button>
                                                        <span>
                                                            {product?.quantity}
                                                        </span>
                                                        <button className="rounded hover:text-white hover:bg-red-600 flex justify-center items-center border border-red-600 text-red-600 w-6 h-6" onClick={() => increaseQuantity(product?._id, product?.quantity)}>+</button>
                                                    </div>
                                                </div>



                                            </div>
                                        )

                                    })

                                )


                        }
                    </div>


                    {/* <div> */}




                    <div className="mt-5 lg:mt-0 w-full max-w-sm">
                        {loading ? (<div className="h-36 bg-slate-200 border border-slate-200 animate-pulse">
                        </div>) : (<div className="h-36 bg-slate-200">total</div>)}
                    </div>
                    {/* </div> */}

                </div>

            </div>
        </>

    )

}

export default Cart