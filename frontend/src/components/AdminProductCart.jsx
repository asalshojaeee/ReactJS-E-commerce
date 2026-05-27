import { useState } from "react"
import { MdModeEditOutline } from "react-icons/md"
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from '../helpers/displayCurrency'
const AdminProductCart = ({ data, fetchData }) => {
    const [editProduct, setEditProduct] = useState(false);



    return (

        <div className="bg-white p-4 rounded" >
            <div className="w-40">
                <div className="w-32 h-32 flex justify-center items-center">
                    <img src={data?.productImage[0]} alt="" width={100} height={100} className="object-fill mx-auto h-full" />
 
                </div>
                <h1 className="text-allipstis line-clamp-2">
                    {data.productName}
                </h1>
                <div>
                    <p className="font-semibold">
                        {displayCurrency(data.sellingPrice)}
                    </p>
                    <div
                        onClick={() => setEditProduct(true)}
                        className="w-fit cursor-pointer ml-auto p-2 bg-green-600 rounded-full text-white">
                        <MdModeEditOutline />
                    </div>


                </div>


            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />

            )


            }

        </div>

    )
}


export default AdminProductCart