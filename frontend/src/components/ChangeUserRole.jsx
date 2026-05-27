
import { IoMdClose } from "react-icons/io";
import { Role } from "../common/Role"
import { useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
export const ChangeUserRole = (

    { name, email, role,userId, onClose ,callFunc}


) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

    }
    const updateUserRole = async () => {
        const fetchResponse = await fetch('http://localhost:3000/api/updateuser', {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId:userId,
                role: userRole
            })

        })

        const responseData = await fetchResponse.json();
        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
        console.log(responseData)

    }
    return (
        <div className="fixed top-0 bottom-0 left-0 w-full h-full z-10 flex justify-center items-center">

            <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">


                {name, email, role, onClose}
                <button className="block ml-auto" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
                <p>Name:{name}</p>
                <p>Email:{email}</p>
                <div className="flex justify-between items-center my-4">
                    <p>Role</p>

                    <select name="" id="" className="border px-4 py-1" value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(Role).map((el) => {
                            return (
                                <option value={el} key={el}>{el}</option>
                            )

                        })}

                    </select>
                </div>
                <button className="w-fit mx-auto block cursor-pointar py-2 px-3 rounded-full bg-red-500 text-white hover:bg-red-700"
                    onClick={updateUserRole}
                >Change Role</button>

            </div>

        </div>

    )

}


