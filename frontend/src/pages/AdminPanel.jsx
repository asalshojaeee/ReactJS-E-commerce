

import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useEffect } from "react";
import  {Role}  from "../common/Role";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate()

    useEffect(()=>{

        if(user?.role !==Role.ADMIN){
            navigate("/")

        }

    },[user])

    return (
        <>
            <div className="min-h-[calc(100vh-120px)]  md:flex hidden">
                <aside className="bg-white min-h-full w-full max-w-60">
                    <div className="h-32 flex justify-center items-center flex-col">
                        <div

                            className="text-4xl cursor-pointer relative flex justify-center ">
                            {user?.profile ? (
                                <img src={user?.profile} className="w-20 h-20 rounded-full" alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />

                            )
                            }


                        </div>
                        <p className="capitalize text-lg font-bold">{user?.name}</p>
                        <p>{user?.role}</p>
                    </div>
                    <div>
                        <nav className="grid p-4">
                            <Link to={'all-users'} className='px-4 py-1 hover:bg-slate-100'>All users</Link>
                            <Link to={'all-products'} className='px-4 py-1 hover:bg-slate-100'>All products</Link>

                        </nav>
                    </div>

                </aside>
                <main className="w-full h-full p-2">
                    <Outlet />
                </main>
            </div>

        </>
    )

}

export default AdminPanel

