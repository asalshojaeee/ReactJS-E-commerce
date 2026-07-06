

import loginIcons from '../assests/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa';
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Footer from '../components/Footer';
import SummaryApi from '../common/index'
import ImageTobase64 from '../helpers/ImageTobase64'

const SignUp = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profile: ""

    });


    const handleOnChange = (event) => {
        const { name, value } = event.target
        setData((preve) => {
            return {
                ...preve,//hold the all perevious info
                [name]: value


            }

        })
    }

    const uploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await ImageTobase64(file)
        setData((preve) => {
            return {
                ...preve,
                profile: imagePic


            }

        })


    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch('http://localhost:3000/api/signup',{
                method:'post',
                headers:{
                    "content-type": "application/json"

                },

                body: JSON.stringify(data)

            })

            const dataApi = await dataResponse.json()
            navigate('/login')
            console.log(dataApi)
            if(dataApi.success){
                toast.success(dataApi.message)
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
       
        }else{
            console.log("please check password and confirm password ")

        }

    }

    return (
        <>
            <section id="signup">

                <div className="mx-auto containar min-h-lvh p-5">
                    <div className="bg-gray-100 shadow-2xl p-5 py-5 w-full max-w-md mx-auto ">
                        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                            <div>
                                <img src={data.profile || loginIcons} alt="" />

                            </div>
                            <form action="">
                                <label>
                                    <div className='opacity-80 text-xs bg-slate-200 pb-4 pt-2 text-center cursor-pointer absolute bottom-0 w-full '>
                                        Upload Photo
                                    </div>
                                    <input
                                        onChange={uploadPic}
                                        type="file" className='hidden' />
                                </label>

                            </form>

                        </div>

                        <form className='pt-6 flex flex-col gap-2' action="" onSubmit={handleSubmit}>

                            <div className='grid'>
                                <label htmlFor="">Name:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        onChange={handleOnChange}
                                        name='name'
                                        required
                                        value={data.name}
                                        className='w-full h-full outline-none' type="text" placeholder='Enter youre name' />

                                </div>
                            </div>

                            <div className='grid'>
                                <label htmlFor="">Email:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        onChange={handleOnChange}
                                        name='email'
                                        required
                                        value={data.email}
                                        className='w-full h-full outline-none' type="email" placeholder='Enter email' />

                                </div>
                            </div>

                            <div>
                                <label htmlFor="">Password:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        name='password'
                                        required
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

                            </div>

                            <div>
                                <label htmlFor="">Confirm Password:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        name='confirmPassword'
                                        value={data.confirmPassword}
                                        onChange={handleOnChange}
                                        required
                                        type={showConfirmPassword ? "text" : "password"} className='w-full h-full outline-none' placeholder='Enter confirm password' />
                                    <div

                                        onClick={() => setShowConfirmPassword(preve => !preve)}
                                        className='cursor-pointer'>
                                        <span>

                                            {showConfirmPassword ? (
                                                <FaEye />

                                            ) :
                                                (<FaEyeSlash />)


                                            }




                                        </span>


                                    </div>

                                </div>
                                <Link className='block ml-auto w-fit hover:underline hover:text-orange-400' to={'/forgot-password'}>forget password?</Link>

                            </div>

                            <button className='text-white cursor-pointer bg-orange-400 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                        </form>
                        <p className='my-4'>Already have account?<Link className='text-orange-400 hover:text-orange-400' to={'/login'}>Login</Link></p>

                    </div>
                </div>
            </section>


        </>
    )
}

export default SignUp