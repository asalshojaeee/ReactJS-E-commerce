import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(9).fill(null)

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
        <div className="containar mx-auto pt-16">
            <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {
                    loading ? (

                        categoryLoading.map((el, index) => {
                            return (
                                <div className="animate-pulse h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200" key={"categoryLoading"+index}></div>

                            )


                        })


                    ) :
                        (

                            categoryProduct.map((product, index) => {
                                return (
                                    <Link key={product?.category} to={'/product-category?category=' + product?.category} className="cursor-pointer">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                            <img className="hover:scale-125 transition-all h-full mix-blend-multiply object-scale-down " src={product?.productImage[0]} alt="" />

                                        </div>
                                        <div>
                                            <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                                        </div>
                                    </Link>
                                )

                            })


                        )
                }


            </div>

        </div>
    )

}


export default CategoryList