import React from 'react'

function CheckoutCart() {
    return (

        <div className="bg-white">
            {/* Delivery Option */}
            <div className="p-3 rounded-md">
                <h3 className='text-xs mb-2'>Delivery Option</h3>
                <div className="flex gap-3 border border-blue-500 p-2 rounded-md w-[250px]">
                    <i className='fa-solid fa-circle-check text-lg mt-1 text-blue-500'></i>
                    <div>
                        <h3 className="text-base font-semibold">Rs. 149</h3>
                        <p className="text-sm text-gray-500 mt-1">Standard Delivery</p>
                        <p className="text-xs text-gray-500 mt-4">Guaranteed by 16-23 Oct</p>
                    </div>
                </div>
            </div>

            {/* Cart Item */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between px-3 mb-6 mt-5">
                <div className="flex">
                    {/* Product Image */}
                    <img
                        src="/sliderimg/p2.webp"
                        alt="Product"
                        className="w-20 h-20 object-cover rounded-md"
                    />

                    {/* Product Details */}
                    <div className="flex flex-col ml-4">
                        <h4 className="font-semibold text-sm">Original new Wireless Magnetic Suction Function Wireless Earbuds Bluetooth handfree</h4>
                        <p className="text-xs text-gray-500">No Brand, Color Family: Black</p>
                    </div>
                </div>

                {/* Product Price & Quantity */}
                <div className="flex flex-row mt-4 w-full sm:w-[50%] md:w-full justify-between sm:mt-0 md:mt-4 sm:ms-3 md:ms-0 lg:ms-3 lg:mt-0 lg:w-[50%] xl:w-[30%]">
                    <div className='flex flex-col'>
                        <p className="font-semibold text-lg text-site-color whitespace-nowrap">Rs. 329</p>
                        <p className="text-gray-500 line-through text-sm mt-1">Rs. 1,000</p>
                        {/* Delete icon */}
                        <i className='fa-solid fa-trash-alt mt-3 hover:text-site-color cursor-pointer'></i>
                    </div>
                    <div className='flex items-start me-4'>
                        <div className="flex flex-row gap-1 items-center">
                            <h3 className="text-gray-500 text-sm">Qty:</h3>
                            <h2 className='text-lg font-semibold'>2</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CheckoutCart