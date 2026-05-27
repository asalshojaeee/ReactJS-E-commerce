import { useState, useEffect } from "react"
import axios from 'axios';
import Header from "../components/Header";
import AdminPanel from '../pages/AdminPanel'
import { toast } from "react-toastify";
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import { ChangeUserRole } from "../components/ChangeUserRole";
import { setUserDetails } from "../store/userSlice";
export const AllUsers = () => {


    const [allUser, setAllUser] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        name: "",
        email: "",
        role: "",
        _id: ""
    })




    const fetchAllUsers = async () => {
        const fetchAllUsersResponse = await fetch('http://localhost:3000/api/allusers', {
            method: "get",
            credentials: 'include'
        });


        const dataResponse = await fetchAllUsersResponse.json();
        if (dataResponse.success) {
            setAllUser(dataResponse.data)
        }
        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

    }
    useEffect(() => {
        fetchAllUsers()

    }, [])


    return (
        <>
            <div className="pb-4 bg-white">
                <table className="w-full userTable">

                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody >


                        {
                            allUser.map((el, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{el?.name}</td>
                                        <td>{el?.email}</td>
                                        <td>{el?.role}</td>
                                        <td>{moment(el?.createdAt).format('ll')}</td>
                                        <td>
                                            <button className="bg-green-200 p-2 cursor-pointer rounded-full"

                                                onClick={() => {
                                                    setUpdateUserDetails(el)
                                                    setOpenUpdateRole(true)

                                                }}
                                            ><MdModeEdit /></button>
                                        </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>

                {
                    openUpdateRole && (
                        <ChangeUserRole
                            onClose={() => setOpenUpdateRole(false)}
                            name={(updateUserDetails.name)}
                            email={(updateUserDetails.email)}
                            role={(updateUserDetails.role)}
                            userId={updateUserDetails._id}

                            callFunc={fetchAllUsers}



                        />



                    )


                }

            </div>

        </>
    )
}

