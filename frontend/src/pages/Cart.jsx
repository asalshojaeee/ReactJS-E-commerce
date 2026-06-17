import { useEffect, useState } from "react"

import Header from '../components/Header'

const Cart = () => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        const response = fetch('http://localhost:3000/api/veiwCartProduct', {
            method: "get",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }


        })
        const responseData = await response.json();
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
                        data.length === 0 & !loading && (
                            <p className="bg-white py-5">No data</p>

                        )
                    }
                </div>

            </div>
        </>

    )

}

export default Cart