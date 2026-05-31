import { useEffect, useState } from "react"
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";




const HorizontalCartProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    const loadingList = new Array(9).fill(null);

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)

    }

    useEffect(() => {
        fetchData()


    }, [])




    return (
        <div className="containar mx-auto px-4 my-6">
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <div className="flex items-center gap-4 md:gap-6">

                {
                    data.map((product, index) => {
                        return (
                            <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex">
                                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[154px] ">
                                    <img className="object-sclae-down h-full hover:scale-110  transition-all" src={product.productImage[0]} alt="" />

                                </div>
                                <div>

                                </div>



                            </div>

                        )

                    })
                }
            </div>


        </div>
    )

}


export default HorizontalCartProduct