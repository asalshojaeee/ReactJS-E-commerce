

import { useContext } from "react";
import { useEffect, useRef, useState } from "react"
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import scrollTop from '../helpers/scrollTop'
import displayCurrency from '../helpers/displayCurrency'
import { FaAngleRight } from 'react-icons/fa6'
import { FaAngleLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from "../helpers/addToCart";
import Context from "../context";
const CategoryProductWiseDisplay = ({ category, heading }) => {


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { fetchUserAddToCart } = useContext(Context)
    const handleAddTocart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()

    }


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
        <div className="containar mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))]  md:gap-6 transition-all overflow-scroll scrollbar-none">


                {
                    data.map((product, index) => {
                        return (
                            <Link to={`/product/${product?._id}`} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex" onClick={scrollTop}>
                                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[154px] ">
                                    <img className="object-sclae-down mix-blend-multiply h-full hover:scale-110  transition-all" src={product.productImage[0]} alt="" />

                                </div>
                                <div className="p-4 grid">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">{product?.productName}</h2>
                                    <p className="capitalize text-slate-500">{product?.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-orange-400 font-medium">{displayCurrency(product.sellingPrice)}</p>
                                        <p className="text-slate-500 line-through">{displayCurrency(product.price)}</p>
                                    </div>
                                    <button

                                        onClick={(e) => handleAddTocart(e, product?._id)}
                                        className="bg-orange-400 cursor-pointer hover:bg-orange-400 text-sm text-white px-3 rounded-full py-0.5">Add to cart</button>
                                </div>



                            </Link>

                        )

                    })
                }
            </div>


        </div>
    )

}


export default CategoryProductWiseDisplay