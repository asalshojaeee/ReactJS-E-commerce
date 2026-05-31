



const fetchCategoryWiseProduct = async (category) => {

    const response = await fetch('http://localhost:3000/api/category-product', {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            category: category
        })

    })


    const dataResponse = await response.json()



    return dataResponse




}

export default fetchCategoryWiseProduct