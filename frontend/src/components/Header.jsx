
import Logo from "./Logo"
import { MdOutlineSearch } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import { Role } from '../common/Role'
import Context from "../context";
export default function Header() {
    const [menuDisplay, setMenuDisplay] = useState(false)
    const contex =useContext(Context)

    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch()
    const handleLoguOut = async () => {
        const fetchData = await fetch('http://localhost:3000/api/userlogout', {
            method: 'get',
            credentials: 'include'

        })

        const data = await fetchData.json()
        if (data.sucesss) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }

        if (data.error) {
            toast.error(data.message)

        }

    }
    return (
        <>

            <header className="h-16 shadow-md bg-white fixed w-full z-40 ">
                <div className="h-full justify-between px-4 flex items-center containar mx-auto">

                    <div className="">

                        <Link to={'/'}><Logo w={100} h={50} /></Link>
                    </div>

                    <div className="hidden  md:flex pl-2 items-center w-full justify-between  max-w-sm  rounded-full focus-within:shadow" >
                        <input className="w-full  outline-none" type="text" placeholder="Search product here..." />
                        <div className="text-lg min-w-[50] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
                            <MdOutlineSearch />

                        </div>
                    </div>


                    <div className="flex items-center gap-7">


                        <div className="relative flex justify-center">


                            {
                                user?._id && (
                                    <div
                                        onClick={() => setMenuDisplay(preve => !preve)}
                                        className="text-3xl cursor-pointer relative flex justify-center">
                                        {user?.profile ? (
                                            <img src={user?.profile} className="w-10 h-10 rounded-full" alt={user?.name} />
                                        ) : (
                                            <FaRegCircleUser />

                                        )
                                        }


                                    </div>
                                )
                            }

                            {
                                menuDisplay && (
                                    <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                                        <nav
                                        >
                                            {
                                                user?.role === Role.ADMIN && (


                                                    <Link
                                                        onClick={() => setMenuDisplay(preve => !preve)}

                                                        to={"/admin-panel/all-products"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                                                    >Admin panel
                                                    </Link>


                                                )
                                            }

                                        </nav>
                                    </div>
                                )
                            }

                        </div>

                        <div className="text-2xl cursor-pointer relative">
                            <span> <FaShoppingCart /></span>
                            <div className="absolute -top-2 -right-3  bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center">
                                <p className="text-xs">{contex?.cartProductCount}</p>

                            </div>


                        </div>
                        <div>
                            {
                                user?._id ? (
                                    <button
                                        onClick={handleLoguOut}

                                        className="px-3 bg-red-600 py-1 rounded-full text-white cursor-pointer hover:bg-red-700">
                                        log out</button>
                                ) : (
                                    <Link to={"/login"}
                                        className="px-3 bg-red-600 py-1 rounded-full text-white cursor-pointer hover:bg-red-700">
                                        login
                                    </Link>
                                )

                            }


                        </div>

                    </div>

                </div>

            </header>



        </>
    )


}