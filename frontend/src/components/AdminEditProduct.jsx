
import { useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from 'react-icons/fa'
import UploadImage from "../helpers/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from 'react-icons/md'

import { toast } from 'react-toastify'

const AdminEditProduct = ({onClose,productData,fetchData}) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage,
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const [image, setImage] = useState(null);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    // const [uploadProductImageInput, setUploadProductImageInput] = useState("")
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }



    const handleUploadProduct = async (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        try {
            formData.append("image", file);

            const res = await axios.post(
                "http://localhost:3000/upload",
                formData
            );

            setImage(res.data.imageUrl);
            setData((preve) => {
                return {
                    ...preve,
                    productImage: [
                        ...preve.productImage,
                        res.data.imageUrl
                    ]

                }
            })
        }
        catch (error) {
            console.log(error)

        }

        // setUploadProductImageInput(file.name);
        // const uploadImageFile = await UploadImage(image);
        // console.log("image:", uploadImageFile)


    }
    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((preve) => {
            return {
                ...preve,
                productImage: [
                    ...newProductImage
                ]

            }
        })


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch('http://localhost:3000/api/update-product', {
            method: 'PUT',
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify(data)
        })

        const responseData = await dataResponse.json();
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()

        }
        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }
    return (

        <div className="fixed bg-slate/35 w-full h-full right-0 top-0 left-0 bottom-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">

                <div className="flex justify-center items-center">
                    <h2 className="font-bold text-lg">Edit Product</h2>
                    <div
                        onClick={onClose}
                        className="w-fit ml-auto text-2xl hover:text-orange-400 cursor-pointer">
                        <IoMdClose />

                    </div>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid p-4 gap-3 overflow-y-scroll h-full pb-4"
                    action="">

                    <label htmlFor="productName">ProductName:</label>
                    <input
                        name="productName"
                        className="p-2 bg-slate-100 rounded"
                        onChange={handleOnChange}
                        value={data.productName}
                        type="text" id="productName" placeholder="Enter product name" />
                    <label className="mt-3" htmlFor="brandName">BrandName:</label>
                    <input
                        className="p-2 bg-slate-100 rounded"
                        onChange={handleOnChange}
                        value={data.brandName}
                        name="brandName"
                        type="text" id="brandName" placeholder="Enter brand name" />
                    <label className="mt-3" htmlFor="category">Category:</label>
                    <select
                        onChange={handleOnChange}
                        value={data.category}
                        className="p-2 bg-slate-100 rounded"
                        name="category" id="">
                        <option value={""}>Select category</option>



                        {productCategory.map((el, index) => {
                            return (
                                <option key={el.value + index} value={el.value}>{el.lable}</option>
                            )

                        })}
                    </select>
                    <label className="mt-3" htmlFor="productImage">Product Image:</label>
                    <label htmlFor="uploadImageInput">

                        <div className="p -2 bg-slate-100 cursor-pointer rounded h-32 w-full flex justify-center items-center">

                            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                                <span className="text-3xl">
                                    <FaCloudUploadAlt />
                                </span>
                                <p className="text-sm">Upload Product Image</p>
                                <input
                                    onChange={handleUploadProduct}
                                    type="file" id="uploadImageInput" className="hidden" />

                            </div>

                        </div>
                    </label>

                    <div>

                        {
                            data?.productImage[0] ? (

                                <div className="flex items-center gap-2">
                                    {
                                        data.productImage.map((el, index) => {
                                            return (

                                                <div className="relative group">
                                                    <img src={el} width={80} height={80} className="bg-slate-100 cursor-pointer" onClick={() => {
                                                        setOpenFullScreenImage(true)
                                                        setFullScreenImage(el)
                                                    }} />

                                                    <div
                                                        onClick={() => handleDeleteProductImage(index)}
                                                        className="absolute cursor-pointer bottom-0 right-0 p-1 text-white bg-orange-400 rounded-full hidden group-hover:block">
                                                        <MdDelete />
                                                    </div>
                                                </div>


                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <p className="text-orange-400 text-xs">Please upload product image</p>
                            )
                        }

                    </div>
                    <label htmlFor="price">Price:</label>

                    <input
                        className="p-2 bg-slate-100 rounded"
                        onChange={handleOnChange}
                        value={data.price}
                        name="price"
                        type="number" id="price" placeholder="Enter price" />


                    <label htmlFor="sellingPrice">Selling Price:</label>

                    <input
                        className="p-2 bg-slate-100 rounded"
                        onChange={handleOnChange}
                        value={data.sellingPrice}
                        name="sellingPrice"
                        type="number" id="sellingPrice" placeholder="Enter Selling price" />
                    <label htmlFor="description">Description:</label>

                    <textarea
                    value={data.description}
                        onChange={handleOnChange}
                        name="description"
                        id="description" placeholder="Enter product description" className="h-28 bg-slate-100 p-1" rows={3}>
                    </textarea>

                    <button className="px-3 py-1 bg-orange-400 text-white mb-5 hover:bg-orange-400">Update Product</button>
                </form>
            </div>
            {
                openFullScreenImage && (
                    <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />

                )

            }

        </div >
    )

}


export default AdminEditProduct