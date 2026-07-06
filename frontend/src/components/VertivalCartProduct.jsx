import { useContext } from "react";
import { useEffect, useRef, useState } from "react"
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import scrollTop from '../helpers/scrollTop'
import displayCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VertivalCartProduct = ({ data = [] }) => {


    const { fetchUserAddToCart } = useContext(Context)
    const handleAddTocart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()

    }
    return(

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))]
        md:justify-between justify-center  md:gap-6 transition-all overflow-scroll scrollbar-none mt-20">


            {
                data.map((product, index) => {
                    return (
                        <Link to={`/product/${product?._id}`} className="w-full min-w-70 md:min-w-[320px] max-w-70 md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex" onClick={scrollTop}>
                            <div className="bg-slate-200 h-full p-4 min-w- md:min-w-38.5 ">
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


    )


}


export default VertivalCartProduct