
import CategoryList from '../components/CategoryList'
import Header from "../components/Header"
import Footer from "../components/Footer"
import BanerProduct from '../components/BanerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'

export default function Home() {


    return (



        <div>

            <CategoryList />
            <BanerProduct />
            <HorizontalCartProduct category={"airpodes"} heading={"Top's Airpodes"} />
            <HorizontalCartProduct category={"earphones"} heading={"Popular Earphones"} />
            <HorizontalCartProduct category={"watches"} heading={"Popular Watches"} />
            <HorizontalCartProduct category={"mobiles"} heading={"Mobiles"} />
            <HorizontalCartProduct category={"camera"} heading={"Camera"} />
            <HorizontalCartProduct category={"televisions"} heading={"TV"} />
            <HorizontalCartProduct category={"speaker"} heading={"Speaker"} />



        </div>
    )


}