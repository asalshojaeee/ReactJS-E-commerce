import { useEffect, useState } from "react"


const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch('http://localhost:3000/api/get-categoryProduct')


        const dataResponse = await response.json();
        setLoading(false)
        setCategoryProduct(dataResponse.data)


    }
    useEffect(() => {
        fetchCategoryProduct()

    }, [])


    return (
        <div className="containar mx-auto p-4">
            <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {categoryProduct.map((product, index) => {
                    return (
                        <div className="">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center">
                                <img className="h-full " src={product?.productImage[0]} alt="" />

                            </div>
                            <div>
                                <p className="text-center text-sm md:text-base">{product?.category}</p>
                            </div>
                        </div>
                    )

                })}


            </div>

        </div>
    )

}


export default CategoryList