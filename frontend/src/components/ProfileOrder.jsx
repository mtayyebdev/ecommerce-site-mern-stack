import React from 'react'

function ProfileOrder() {
    return (
        <>
            <div className="w-full bg-white text-black">
                <div className="flex flex-row items-center justify-between border-b px-6 py-3">
                    <h2 className='font-semibold'>M Tayyeb Dev</h2>
                    <h2 className='bg-[rgb(236,240,247)] py-0.5 px-3 rounded-full'>Cancelled</h2>
                </div>
                <div className="flex flex-col justify-between md:flex-row p-6 w-full">
                    {/* <!-- Left side with Image and Description --> */}
                    <div className="flex items-start space-x-4 w-full md:w-3/4">
                        {/* <!-- Product Image --> */}
                        <div className="overflow-hidden">
                            <img src="/sliderimg/p2.webp" alt="Product Image" className="w-[100px] h-[100px]" />
                        </div>
                        {/* <!-- Product Description --> */}
                        <div className='w-1/2'>
                            <h2 className="text-sm">Blusher And Highlighter kit- 3in1 pallate Professional Makeup kit for Eyes and Cheeks</h2>
                            <p className="text-sm text-gray-500">Shade: <span className="font-medium">Random number</span></p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Rs. 327</p>
                        </div>
                    </div>

                    {/* <!-- Right side --> */}
                    <div className="text-right w-full mt-3 md:mt-0 md:w-1/4 flex items-start">
                        <p className="text-sm text-gray-500">Qty: 1</p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProfileOrder