
import loginIcons from '../assests/signin.gif'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Footer from '../components/Footer';
import SummaryApi from '../common';
import { toast } from 'react-toastify'

import { useContext } from 'react';
import Context from '../context';


export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const { fetchUserDetails,fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (event) => {
        const { name, value } = event.target
        setData((preve) => {
            return {
                ...preve,//hold the all perevious info
                [name]: value


            }

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const datResponse = await fetch("http://localhost:3000/api/signin", {
            method: 'post',
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const dataApi = await datResponse.json()
        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()


        }
        if (dataApi.error) {
            toast.success(dataApi.message)

        }

    }

    console.log(data)

    return (
        <>
            <section id="login">

                <div className="mx-auto containar min-h-lvh p-4">
                    <div className="bg-gray-100 shadow-2xl p-5 py-5 w-full max-w-md mx-auto ">
                        <div className='w-20 h-20 mx-auto'>
                            <img src={loginIcons} alt="" />
                        </div>

                        <form className='pt-6 flex flex-col gap-2' action="" onSubmit={handleSubmit}>

                            <div className='grid '>
                                <label htmlFor="">Email:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        onChange={handleOnChange}
                                        name='email'
                                        value={data.email}
                                        className='w-full h-full outline-none' type="email" placeholder='Enter email' />

                                </div>
                            </div>

                            <div>
                                <label htmlFor="">Password:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        name='password'
                                        value={data.password}
                                        onChange={handleOnChange}
                                        type={showPassword ? "text" : "password"} className='w-full h-full outline-none' placeholder='Enter password' />
                                    <div

                                        onClick={() => setShowPassword(preve => !preve)}
                                        className='cursor-pointer'>
                                        <span>

                                            {showPassword ? (
                                                <FaEye />

                                            ) :
                                                (<FaEyeSlash />)


                                            }




                                        </span>


                                    </div>

                                </div>
                                <Link className='block ml-auto w-fit hover:underline hover:text-orange-400' to={'/forgot-password'}>forget password?</Link>

                            </div>

                            <button className='text-white cursor-pointer bg-orange-400 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                        </form>
                        <p className='my-4'>Don't have account?<Link className='text-orange-400 hover:text-orange-400' to={'/sign-up'}>sign up</Link></p>

                    </div>
                </div>
            </section>

            <Footer />

        </>

    )





}

