import React from 'react'
import { Link } from 'react-router-dom'

function ManageAccount() {
    return (
        <>
            <div class="container mx-auto p-4">
                {/* <!-- Profile and Address Section --> */}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* <!-- Personal Profile --> */}
                    <div class="bg-white p-4 shadow rounded-md">
                        <div class="flex justify-between items-center">
                            <h2 class="text-lg font-semibold">Personal Profile</h2>
                            <a href="#" class="text-blue-500">EDIT</a>
                        </div>
                        <p class="mt-2 text-gray-700">M Tayyeb</p>
                        <div class="mt-4">
                            <label class="inline-flex items-center">
                                <input type="checkbox" checked class="form-checkbox text-orange-500" />
                                <span class="ml-2">Receive marketing SMS</span>
                            </label>
                        </div>
                    </div>

                    {/* <!-- Address Book --> */}
                    <div class="bg-white p-4 shadow rounded-md">
                        <div class="flex justify-between items-center">
                            <h2 class="text-lg font-semibold">Address Book</h2>
                            <a href="#" class="text-blue-500">EDIT</a>
                        </div>
                        <div class="mt-4">
                            <h3 class="text-sm font-semibold text-gray-600">DEFAULT SHIPPING ADDRESS</h3>
                            <p class="mt-1 text-gray-700">Muhammad Tayyeb</p>
                            <p class="text-gray-600">kalu Khan khat kali<br />Khyber Pakhtunkhwa - Swabi - Kalu Khan</p>
                            <p class="text-gray-600">(+92) 3368212215</p>
                        </div>
                    </div>

                    {/* <!-- Default Billing Address --> */}
                    <div class="bg-white p-4 shadow rounded-md">
                        <h3 class="text-sm font-semibold text-gray-600">DEFAULT BILLING ADDRESS</h3>
                        <p class="mt-2 text-gray-700">Muhammad Tayyeb</p>
                        <p class="text-gray-600">kalu Khan khat kali<br />Khyber Pakhtunkhwa - Swabi - Kalu Khan</p>
                        <p class="text-gray-600">(+92) 3368212215</p>
                    </div>
                </div>

                {/*  */}
                {/* <!-- Recent Orders Section --> */}
                <div class="bg-white shadow-md rounded-md p-4">
                    <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 border-b text-left text-gray-600">Order #</th>
                                    <th class="px-4 py-2 border-b text-left text-gray-600">Placed On</th>
                                    <th class="px-4 py-2 border-b text-left text-gray-600">Items</th>
                                    <th class="px-4 py-2 border-b text-left text-gray-600">Total</th>
                                    <th class="px-4 py-2 border-b text-left text-gray-600"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <!-- Order 1 --> */}
                                <tr>
                                    <td class="px-4 py-2 border-b text-gray-800">197437108304553</td>
                                    <td class="px-4 py-2 border-b text-gray-800">11/10/2024</td>
                                    <td class="px-4 py-2 border-b">
                                        <img src="path_to_image_1.jpg" alt="item" class="h-10 w-10 rounded-md" />
                                    </td>
                                    <td class="px-4 py-2 border-b text-gray-800">Rs. 527</td>
                                    <td class="px-4 py-2 border-b text-blue-500">
                                        <a href="#" class="hover:underline">MANAGE</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageAccount
