
import CategoryList from '../components/CategoryList'  
import Header from "../components/Header"
import Footer from "../components/Footer"
import BanerProduct from '../components/BanerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'

export default function Home() {


    return (



    <div>

        <CategoryList/>
        <BanerProduct/>
        <HorizontalCartProduct category={"airpodes"} heading={"Top's Airpodes"}/>

    </div>
    )


}