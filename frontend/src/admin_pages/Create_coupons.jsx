import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CreateCoupon } from '../store/slices/adminSlices/CreateCouponSlice.jsx'

function Create_coupons() {
    const dispatch = useDispatch()
    const [name, setname] = useState("")
    const [discount, setdiscount] = useState(0);
    const [code, setcode] = useState("")
    const [daysToExpire, setdaysToExpire] = useState(0)
    const [loader, setloader] = useState(false)

    const createCoupon = async () => {
        const data = {
            name,
            discount,
            code,
            daysToExpire
        }

        setloader(true)
        await dispatch(CreateCoupon(data))
        setloader(false)
    }

    const expiredaysHandler = (value) => {
        let parseToEnd = parseInt(value);
        setdaysToExpire(parseToEnd)
    }

    return (
        <>
            <div className="w-full">
                <div>
                    <h2 className='text-xl font-semibold'>Create Coupons</h2>
                    <div className=' w-[12rem] h-0.5 mt-1 bg-blue-600'></div>
                </div>
                <div className="space-y-6 mt-5">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">
                            Coupon Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            required
                            className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                            placeholder="Enter coupon name"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="code">
                            <label htmlFor="code" className="text-gray-800 text-sm mb-2 block">
                                Code
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    name="code"
                                    type="text"
                                    id="code"
                                    value={code}
                                    onChange={(e) => setcode(e.target.value)}
                                    required
                                    className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter code"
                                />
                            </div>
                        </div>
                        <div className="discount">
                            <label htmlFor="discount" className="text-gray-800 text-sm mb-2 block">
                                Discount
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    name="discount"
                                    type="number"
                                    id="discount"
                                    value={discount}
                                    onChange={(e) => setdiscount(e.target.value)}
                                    required
                                    className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter discount"
                                />
                            </div>
                        </div>
                        <div className="expire">
                            <label htmlFor="expire" className="text-gray-800 text-sm mb-2 block">
                                Expire Days
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    name="expire"
                                    type="number"
                                    id="expire"
                                    value={daysToExpire}
                                    onChange={(e) => expiredaysHandler(e.target.value)}
                                    required
                                    className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter expire days"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="!mt-12">
                    <button
                        onClick={createCoupon}
                        type="submit"
                        className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none"
                    >
                        {loader ? "Creating...." : "Create Coupon"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Create_coupons