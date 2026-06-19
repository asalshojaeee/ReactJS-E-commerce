import { useEffect, useState } from "react"
import { useContext } from "react"
import Header from '../components/Header'
import { FaS } from "react-icons/fa6"
import Context from "../context"
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

    return (
        <>
            {/* <Header/> */}
            <div className="container mx-auto">

                <div className="text-center text-lg py-2 my-3">
                    {
                        data.length === 0 && !loading && (
                            <p className="bg-white py-5">No data</p>

                        )
                    }
                </div>


                <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
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
                                            <div key={product?._id + "add to cart loading"} className="w-full bg-white h-32 my-2  rounded-md">
                                                <div className="w-28 h-28">
                                                    <img src={product?.productId?.productImage[0]} alt=""  className="h-full w-full object-scale-down mix-blend-multiply"/>
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