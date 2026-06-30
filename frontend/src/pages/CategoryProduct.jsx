import { useParams } from "react-router-dom"

import productCategory from '../helpers/productCategory'
const CategoryProduct = () => {
    const params = useParams();//get params
    return (
        <div className="container  p-20">



            {/* desktop */}
            <div className="hidden lg:grid grid-cols-5">





                {/* left */}
                <div className="bg-white p-2 min-h-[calc(100vh-120px)]">

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
                                        <div>
                                            <input type="checkbox" name={"category"} id={categoryName?.value}/>
                                            <label htmlFor={categoryName?.value}>{categoryName?.lable}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>

                </div>






                {/* right */}
                <div>dis</div>
            </div>

        </div>
    )

}


export default CategoryProduct