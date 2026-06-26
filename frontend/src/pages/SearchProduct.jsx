


import { useLocation, useParams } from "react-router-dom"
import Header from "../components/Header"
const SearchProduct = () => {


    const query = useLocation()


    const fetchProduct = async () => {

        const response = await fetch('http://localhost:3000/api/search+query', {

            method: "get"
        })


        const data = await response.json()

        return (
            <Header />




        )

    }


    export default SearchProduct