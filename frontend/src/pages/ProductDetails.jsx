import { useCallback, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios"
import { FaStarHalf } from "react-icons/fa6";
import displayCurrency from '../helpers/displayCurrency'
import { FaStar } from "react-icons/fa6";
import HorizontalCartProduct from '../components/HorizontalCartProduct'

import Header from "../components/Header"

const ProductDetails = () => {
    const [loading, setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState("");
    const [zoomImage, setZoomImage] = useState({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = useState(false);
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
        setData(response.data.data)
        setActiveImage(response?.data.data.productImage[0])
    }

    useEffect(() => {
        fetchProductDetail()
    }, [])
    const handleMouseEnterProduct = (imgUrl) => {
        setActiveImage(imgUrl)


    }

    const handleZommImage = useCallback((e) => {
        setZoom(true)
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height
        setZoomImage({
            x,
            y
        })
    }, [zoomImage])

    const handleZoomLeave = () => {
        setZoom(false)

    }


    return (
        <>
            <Header />


            <div className="container p-4 mx-auto">
                <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4 mt-15">

                    <div className="h-96 flex flex-row-reverse gap-4">
                        <div className="lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200 relative p-2">
                            <img
                                onMouseLeave={handleZoomLeave}
                                onMouseMove={handleZommImage}
                                src={activeImage}
                                className="h-full w-full object-scale-down mix-blend-multiply" />
                            {
                                zoom && (

                                    <div className="hidden lg:block absolute min-w-[400px] min-h-[400px] overflow-hidden p-1 -right-[510px] top-0">
                                        <div className="w-full h-full min-h-[400px] min-w-[500px] " style={{
                                            backgroundImage: `url(${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImage.x * 100}% ${zoomImage.y * 100}%`
                                        }}>

                                        </div>
                                    </div>
                                )
                            }

                        </div>
                        <div className="h-full">
                            {
                                loading ? (
                                    <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                        {
                                            productImageListLoading.map((el, index) => {
                                                return (
                                                    <div className="h-20 w-20 bg-slate-200 animate-pulse rounded" key={index}
                                                    >

                                                    </div>
                                                )
                                            })
                                        }

                                    </div>

                                ) :
                                    (
                                        <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                            {
                                                data?.productImage?.map((imgURL, index) => {
                                                    return (
                                                        <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imgURL}>
                                                            <img
                                                                onClick={() => handleMouseEnterProduct(imgURL)}
                                                                onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                                                                src={imgURL} className="h-full cursor-pointer mix-blend-multiply w-full object-scale-down" alt="" />
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
                    {
                        loading ? (<div className="grid gap-1 w-full">
                            <p className=" bg-slate-200 animate-pulse h-6 lg:h-8 rounded-full inline-block w-full"></p>
                            <h2 className="text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 w-full"></h2>
                            <p className="capitalize text-slate-400 animate-pulse h-6 bg-slate-200 min-w-[100px] w-full lg:h-8 "></p>
                            <div className="text-red-600 flex bg-slate-200 h-6 animate-pulse items-center gap-1 w-full lg:h-8 ">



                            </div>
                            <div className="flex items-center gap-2 text-xl font-medium my-1 lg:text-2xl h-6 animate-pulse bg-slate-200 w-full lg:h-8 ">
                                <p className="text-red-600 bg-slate-200 w-full"></p>
                                <p className="text-red-400 line-through bg-slate-200 w-full"></p>

                            </div>
                            <div className="flex items-center gap-3 my-2 w-full">
                                <button className="h-6 lg:h-8  bg-slate-200 ronunded animate-pulse  w-full"></button>
                                <button className="h-6 lg:h-8  bg-slate-200 ronunded animate-pulse w-full"></button>

                            </div>
                            <div className="w-full">
                                <p className="text-slate-600 font-medium lg:h-8  bg-slate-200 ronunded animate-pulse my-1 h-6"></p>
                                <p className=" bg-slate-200 ronunded animate-pulse h-10 lg:h-12 "></p>
                            </div>

                        </div>) :

                            (

                                <div className="flex flex-col gap-1">
                                    <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">{data?.brandName}</p>
                                    <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
                                    <p className="capitalize text-slate-400">{data.category}</p>
                                    <div className="text-red-600 flex items-center gap-1">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalf />


                                    </div>
                                    <div className="flex items-center gap-2 text-xl font-medium my-1 lg:text-2xl">
                                        <p className="text-red-600">{displayCurrency(data?.sellingPrice)}</p>
                                        <p className="text-red-400 line-through">{displayCurrency(data?.price)}</p>

                                    </div>
                                    <div className="flex items-center gap-3 my-2">
                                        <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white">Buy</button>
                                        <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] bg-red-600 text-white hover:text-red-600 hover:bg-white">Add To Cart</button>

                                    </div>
                                    <div>
                                        <p className="text-slate-600 font-medium my-1">Description:</p>
                                        <p className="">{data?.description}</p>
                                    </div>

                                </div>
                            )
                    }


                </div>
            </div>

            {
                data.category && (
                    <HorizontalCartProduct category={data?.category} heading={"Recommended Product"} />

                )
            }

        </>

    )


}

export default ProductDetails