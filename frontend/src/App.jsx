import Home from "./pages/Home"
import Login from './pages/Login'
import ForgotPassword from "./pages/ForgotPassword"
import SignUp from "./pages/SignUp"
import { useEffect, useState } from "react"
import { data, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Context from "./context"
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux'
import { setUserDetails } from "./store/userSlice"
import AdminPanel from "./pages/AdminPanel"
import { AllUsers } from "./pages/AllUsers"
import { AllProducts } from "./pages/AllProducts"
import Header from "./components/Header"
import Layout from "./components/Layout"
import CategoryProduct from "./pages/CategoryProduct"


import ProductDetails from './pages/ProductDetails'
import Cart from "./pages/Cart"
function App() {

  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)


  const fetchUserDetails = async () => {
    try {
      const responseData = await fetch('http://localhost:3000/api/user-details', {
        method: 'get',
        credentials: 'include'
      })
      const dataApi = await responseData.json()
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data))
      }


    }
    catch (error) {
      console.log(error)

    }


  }




  const fetchUserAddToCart = async () => {
    const responseData = await fetch('http://localhost:3000/api/countAddToCartProduct', {
      method: "get",
      credentials: 'include'
    })


    const dataApi = await responseData.json()

    setCartProductCount(dataApi?.data.count)


  }
  useEffect(() => {
    fetchUserDetails()
    fetchUserAddToCart()


  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart

      }}>
        <Routes>


          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path='product-category/:categoryName' element={<CategoryProduct />} />



            <Route path="/admin-panel" element={<AdminPanel />}>

              <Route path="all-users" element={<AllUsers />} />
              <Route path="all-products" element={<AllProducts />} />

            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp />} />


          <Route path="product/:id" element={<ProductDetails />} />


          <Route path="/cart" element={<Cart />} />




        </Routes>

        <ToastContainer />
      </Context.Provider>
    </>
  );
}

export default App;