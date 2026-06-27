import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const SearchProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const query = useLocation();

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `http://localhost:3000/api/search${query.search}`
            );

            const dataResponse = await response.json();
            setLoading(false)

            setData(dataResponse.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">


                {
                    loading && (
                        <p className="text-lg text-center">Loading...</p>
                    )

                }
                <p>Search Results: {data.length}</p>

                {

                    data.length == 0 && !loading && (
                        <p className="bg-white text-lg text-center p-4">No data found...</p>

                    )
                }
                {/* {
                    data.length !== 0 && !loading && (
                        data.map((pro,index) => {
                            return(



                            )

                        })

                    )
                } */}


            </div>
        </>
    );
};

export default SearchProduct;