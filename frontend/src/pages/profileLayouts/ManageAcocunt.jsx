import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GetOrders } from '../../store/slices/orderSlices/GetOrdersSlice.jsx'
import { GetUserInfo } from '../../store/slices/userSlices/GetUserInfoSlice.jsx'

function ManageAccount() {
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.getorders)
    const { user } = useSelector((state) => state.userdata)
    const { data } = useSelector((state) => state.getuserinfo)


    useEffect(() => {
        dispatch(GetOrders())
        dispatch(GetUserInfo());
    }, [])

    const infoData = data && data.find((info) => info.defaultAddress === true);

    const reversedOrders = orders && [...orders.data].reverse().slice(0, 7);


    return (
        <>
            <div className="mt-3">
                <h2 className='text-2xl font-semibold mb-4'>Manage My Account</h2>
                {/* <!-- Profile and Address Section --> */}
                <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                    {/* <!-- Personal Profile --> */}
                    <div className="bg-white p-4 w-full md:w-[35%]">
                        <div className="flex items-center gap-1">
                            <h2 className="text-lg">Personal Profile</h2>
                            {/* <p>|</p>
                            <a href="#" className="text-blue-500 text-sm mt-1">EDIT</a> */}
                        </div>
                        <p className="mt-2 text-gray-700">{user && user.data.name}</p>
                        <div className="mt-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" checked className="form-checkbox text-orange-500" />
                                <span className="ml-2 text-sm">Receive marketing SMS</span>
                            </label>
                        </div>
                    </div>

                    {/* <!-- Address Book --> */}
                    <div className="flex gap-4 flex-col md:flex-row bg-white p-4 w-full md:w-[65%]">
                        <div className="border-0 md:border-r-2 border-gray-300 w-full md:w-1/2 pb-0 md:pb-7">
                            <div className="flex gap-1 items-center">
                                <h2 className="text-lg">Address Book</h2>
                                {/* <p>|</p>
                                <a href="#" className="text-blue-500 text-sm mt-1">EDIT</a> */}
                            </div>
                            <div className="mt-4 text-sm">
                                <h3 className="text-gray-600">DEFAULT SHIPPING ADDRESS</h3>
                                <p className="mt-1 mb-1 font-semibold">{infoData && infoData.name}</p>
                                <p className="text-gray-600">{infoData && infoData.address}<br />{infoData && infoData.country} - {infoData && infoData.province} - {infoData && infoData.city} - {infoData && infoData.zone}</p>
                                <p className="text-gray-600">(+92) {infoData && infoData.phone}</p>
                            </div>
                        </div>

                        {/* <!-- Default Billing Address --> */}
                        <div className=" text-sm w-full md:w-1/2 mt-11">
                            <h3 className="text-gray-600">DEFAULT BILLING ADDRESS</h3>
                            <p className="mt-2 mb-1 font-semibold">{user && user.data.name}</p>
                            <p className="text-gray-600">{infoData && infoData.address}<br />{infoData && infoData.country} - {infoData && infoData.province} - {infoData && infoData.city} - {infoData && infoData.zone}</p>
                            <p className="text-gray-600">(+92) {infoData && infoData.phone}</p>
                        </div>
                    </div>
                </div>

                {/*  */}
                {/* <!-- Recent Orders Section --> */}
                <div className="bg-white mt-3">
                    <h2 className="text-lg font-semibold py-3 ps-4">Recent Orders</h2>
                    <div className="overflow-x-auto overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className='bg-[rgb(250,250,250)] border-b'>
                                    <th className="px-4 py-3 whitespace-nowrap text-left text-gray-600">Order #</th>
                                    <th className="px-4 py-3 whitespace-nowrap text-left text-gray-600">Placed On</th>
                                    <th className="px-4 py-3 whitespace-nowrap text-left text-gray-600">Items</th>
                                    <th className="px-4 py-3 whitespace-nowrap text-left text-gray-600">Total</th>
                                    <th className="px-4 py-3 whitespace-nowrap text-left text-gray-600"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <!-- Order 1 --> */}
                                {
                                    reversedOrders && reversedOrders.map((order) => (
                                        <tr className='border-b'>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-800">{order.orderId}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-800">{order.deliveryDate}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                                <img src={order.image} alt="item" className="h-10 w-10" />
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-800">Rs. {order.price}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-blue-500">
                                                <Link to={`/user/order-details/${order._id}`} className="hover:underline">MANAGE</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageAccount
