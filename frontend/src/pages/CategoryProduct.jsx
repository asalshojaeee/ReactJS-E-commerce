import { useParams } from "react-router-dom"


const CategoryProduct=()=>{
    const params=useParams();//get params
    console.log(params)
    return(
        <div>
            {params?.categoryName}

        </div>
    )

}


export default CategoryProduct