import React from "react";

function OrderDetails() {
    return (
        <>
            <div className="w-full mt-3">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

                <div className="w-full bg-white text-black">
                    <div className="flex flex-row items-center justify-between border-b px-6 py-3">
                        <h2 className="font-semibold">M Tayyeb Dev</h2>
                        <h2 className="bg-[rgb(236,240,247)] py-0.5 px-3 rounded-full">
                            Cancelled
                        </h2>
                    </div>
                    <div className="flex flex-col justify-between md:flex-row p-6 w-full">
                        <div className="flex items-start space-x-4 w-full md:w-3/4">
                            <div className="overflow-hidden">
                                <img
                                    src="/sliderimg/p2.webp"
                                    alt="Product Image"
                                    className="w-[100px] h-[100px]"
                                />
                            </div>
                            <div className="w-1/2">
                                <h2 className="text-sm">
                                    Blusher And Highlighter kit- 3in1 pallate Professional Makeup
                                    kit for Eyes and Cheeks
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Shade: <span className="font-medium">Random number</span>
                                </p>
                                <p className="text-xs mt-1">Cancelled</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Rs. 327</p>
                            </div>
                        </div>
                        <div className="text-right w-full mt-3 md:mt-0 md:w-1/4 flex items-start">
                            <p className="text-sm text-gray-500">Qty: 1</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white text-black w-full py-2 pb-4 mt-4 px-3">
                    <div className="order flex gap-1 items-center text-sm">
                        <p>Order</p>
                        <p>599483659639456439</p>
                    </div>
                    <div className="time flex gap-1 items-center text-xs mt-0.5 text-gray-500">
                        <p>Placed On</p>
                        <p>11 Oct 2024 15:53:22</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full gap-4 mt-4">
                    <div className="left w-full md:w-1/2 h-[130px] bg-white py-4 px-3 pb-6">
                        <h3 className="text-balance font-semibold">Muhammad Tayyeb</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <p className="py-0.5 px-2 bg-site-color rounded-full text-white">Home</p>
                            <p>Kalu Khan, kalu Khan khat kali, Pakistan</p>
                        </div>
                        <p className="mt-4 text-sm">3368212215</p>
                    </div>
                    <div className="right w-full md:w-1/2 text-sm bg-white py-4 px-3 pb-6">
                        <h2 className="text-xl font-semibold">Total Summary</h2>
                        <div className="flex items-center justify-between mt-2">
                            <h4 className="">Subtotal(1 Item)</h4>
                            <h4>Rs. 345345</h4>
                        </div>
                        <div className="flex items-center mb-3 justify-between mt-1">
                            <h4 className="">Shipping Fee</h4>
                            <h4>Rs. 345345</h4>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between mt-3">
                            <h4 className="">Total</h4>
                            <h4 className="text-lg font-semibold">Rs. 345345</h4>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <h4 className="">Paid by</h4>
                            <h4 className="text-lg font-semibold"></h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;
