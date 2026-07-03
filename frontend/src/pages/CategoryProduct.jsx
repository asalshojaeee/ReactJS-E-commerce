import { useParams } from "react-router-dom"
import CategoryProductWiseDisplay from "../components/CategoryProductWiseDisplay";
import productCategory from '../helpers/productCategory'
import { useEffect, useState } from "react";
import VertivalCartProduct from "../components/VertivalCartProduct";
const CategoryProduct = () => {
    const params = useParams();//get params
    const [data, setData] = useState([]);
    const [loading, setLoadin] = useState(false);
    const [selectCategory, setSelectCategory] = useState({})
    const [filterCategortList, setFilterCategoryList] = useState([])


    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/filterproduct', {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategortList
            })


        });
        const responseData = await response.json()
        setData(responseData?.data || [])



    }


    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target;
        setSelectCategory((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategortList])
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)
        setFilterCategoryList(arrayOfCategory)

    }, [selectCategory])
    return (
        <div className="container  p-20">



            {/* desktop */}
            <div className="hidden lg:flex gap-5">





                {/* left */}
                <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">

                    <div className=" ">
                        <h3 className="text-lg uppercase font-base border-b border-slate-300 p-2 text-slate-500">Sort by</h3>
                        <form action="" className="text-sm py-2 flex flex-col gap-2">



                            <div className="flex items-center gap-3">
                                <input type="radio" name="sortBy" />
                                <label htmlFor="">Price Low to High</label>

                            </div>


                            <div className="flex items-center gap-3">

                                <input type="radio" name="sortBy" />
                                <label htmlFor="">Price High to Low</label>
                            </div>

                        </form>
                    </div>






                    <div className=" ">
                        <h3 className="text-lg uppercase font-base border-b border-slate-300 p-2 text-slate-500">Category</h3>
                        <form action="" className="text-sm py-2 flex flex-col gap-2">



                            {

                                productCategory.map((categoryName, index) => {

                                    return (
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox"
                                                checked={selectCategory[categoryName?.value]}
                                                onChange={handleSelectCategory}
                                                value={categoryName?.value}
                                                name={"category"} id={categoryName?.value} />
                                            <label htmlFor={categoryName?.value}>{categoryName?.lable}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>

                </div>






                {/* right */}
                <div className="w-full">
                    {data.length !== 0 && !loading && (

                        <VertivalCartProduct data={data} />
                    )}
                </div>
            </div>

        </div>
    )

}


export default CategoryProduct