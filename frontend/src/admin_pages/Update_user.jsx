import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleUser } from '../store/slices/adminSlices/GetSingleUserSlice.jsx'
import { UpdateUsers } from '../store/slices/adminSlices/UpdateUserSlice.jsx'

function Update_user() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.getadminsingleuser);
    const { id } = useParams();
    const [loader, setloader] = useState(false)
    const [eye, seteye] = useState(false)
    const [username, setusername] = useState("");
    const [gender, setgender] = useState("")
    const [phone, setphone] = useState("")
    const [birthday, setbirthday] = useState("")
    const [email, setemail] = useState("");
    const [admin, setadmin] = useState(false);
    const [password, setpassword] = useState("");

    const getuser = async (id) => {
        await dispatch(GetSingleUser(id))
            .then((res) => {
                if (res.type === "getsingleuser/fulfilled") {
                    setusername(res.payload.data.name);
                    setemail(res.payload.data.email);
                    setphone(res.payload.data.phone);
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getuser(id)
    }, [id]);

    const updateUser = async () => {
        try {
            setloader(true);
            const data = {
                username,
                email,
                phone,
                birthday,
                password,
                gender,
                admin,
                id
            }
            dispatch(UpdateUsers(data))
        } catch (error) {
            console.log("User updating error: ", error);
        }
        setloader(false)
    };

    return (
        <>
            <div className="w-full">
                <div>
                    <h2 className='text-xl font-semibold'>Update User</h2>
                    <div className=' w-[10rem] h-0.5 mt-1 bg-blue-600'></div>
                </div>
                <div className="space-y-6 mt-5">
                    {/* <div className="img flex items-center justify-center py-4">
                        <label htmlFor="img">
                            <img src={avatar ? URL.createObjectURL(avatar) : "/sliderimg/p4.webp"} className="rounded-full w-[200px] object-cover h-[200px]" alt="user img" />
                        </label>
                        <input type="file" name="img" onChange={(e) => setAvatar(e.target.files[0])} className="hidden" id="img" />
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Username
                            </label>

                            <input
                                name="name"
                                type="text"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                required
                                className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter username"
                            />

                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Email Id
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                required
                                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter email"
                            />

                        </div>
                        <div>
                            <label htmlFor="phone" className="text-gray-800 text-sm mb-2 block">
                                Phone
                            </label>

                            <input
                                name="phone"
                                type="number"
                                id="phone"
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                                required
                                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter Phone Number"
                            />

                        </div>
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                name="password"
                                type={eye ? "text" : "password"}
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                required
                                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter password"
                            />
                            <span
                                className="absolute right-4 cursor-pointer text-gray-500"
                                onClick={() => seteye(!eye)}
                            >
                                <i className={`fa-solid ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label
                                htmlFor="admin"
                                className="text-gray-800 text-sm mb-2 block"
                            >
                                Admin
                            </label>
                            <select
                                name="admin"
                                onChange={(e) => setadmin(e.target.value)}
                                id="admin"
                                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                            >
                                <option className="text-black">Select......</option>
                                <option value={false} className="text-black">False</option>
                                <option value={true} className="text-black">True</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="gender"
                                className="text-gray-800 text-sm mb-2 block"
                            >
                                Gender
                            </label>
                            <select
                                name="gender"
                                onChange={(e) => setgender(e.target.value)}
                                id="gender"
                                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                            >
                                <option className="text-black">Select......</option>
                                <option value="male" className="text-black">Male</option>
                                <option value="female" className="text-black">Female</option>
                                <option value="other" className="text-black">Other</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="birth"
                                className="text-gray-800 text-sm mb-2 block"
                            >
                                Birth Day
                            </label>
                            <input type="date" onChange={(e) => setbirthday(e.target.value)} name="birth" required
                                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" id="birth" />
                        </div>
                    </div>
                </div>
                <div className="!mt-12">
                    <button
                        onClick={updateUser}
                        type="submit"
                        className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none"
                    >
                        {loader ? "Updating...." : "Update User"}
                    </button>
                </div>
            </div>

        </>
    );
}

export default Update_user;
