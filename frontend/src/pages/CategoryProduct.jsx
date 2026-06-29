import { useParams } from "react-router-dom"


const CategoryProduct = () => {
    const params = useParams();//get params
    return (
        <div className="container mx-auto p-4">

            <div className="hidden lg:grid grid-cols-[200px,1fr]">
                <div className="bg-white p-2 min-h-[calc(100vh-120px)]">


                    <div className=" ">
                        <h3 className="text-lg uppercase font-medium text-slate-500">
                            Sort by
                        </h3>
                    </div>

                </div>


                <div>
                    dis
                </div>


            </div>

        </div>
    )

}


export default CategoryProduct