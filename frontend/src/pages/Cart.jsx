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
        const response = fetch('http://localhost:3000/api/veiwCartProduct', {
            method: "get",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },


        })


        // setLoading(false)
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


                <div>
                    <div className="w-full max-w-3xl">
                        {
                            loading ? (
                                loadingCart.map((el, index) => {

                                    return (
                                        <div key={el+"add to cart loading"} className="w-full bg-slate-200 h-32 my-1 animate-pulse rounded-md">


                                        </div>
                                    )

                                })

                            )

                                : (<div>
                                </div>
                                )


                        }
                    </div>
                </div>

            </div>
        </>

    )

}

export default Cart