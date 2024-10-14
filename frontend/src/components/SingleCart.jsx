import React, { useState } from 'react'

function SingleCart() {
    const [quantity, setquantity] = useState(1);
    return (
        <>
            <div className="flex flex-col lg:flex-row bg-white text-black gap-3 justify-between py-[10px] px-3">
                <div className='flex flex-row gap-3'>
                    <input type="checkbox" name="box" id="box" />
                    <img src="/sliderimg/p2.webp" alt="img" className='w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded' />
                    <div className='w-auto xl:w-[400px]'>
                        <h2 className='product-name text-sm'>Improved Quality LARGE Storage ggg j Bags Organizers Portable Bamboo Clothes Blanket Large Folding Bag wie</h2>
                        <div className="flex items-center text-xs mt-1 text-gray-500">
                            <div className="brands">
                                <h2>No Brands</h2>
                            </div>
                            <p>,</p>
                            <div className="color flex items-center ms-1">
                                <h2>Color Family: </h2>
                                <h2>Black</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-6 mt-3 ms-6 md:ms-3 lg:ms-0 lg:mt-0'>
                    <div className="prices md:ms-4">
                        <div className="price text-lg text-site-color font-semibold whitespace-nowrap">Rs. 1000</div>
                        <div className="dicount-price line-through font-semibold text-gray-500">Rs. 400</div>
                        <div className="flex items-center gap-3 text-gray-600 mt-1">
                            <i className='fa-regular text-lg fa-heart cursor-pointer hover:text-site-color'></i>
                            <i className='fa-solid fa-trash-alt cursor-pointer hover:text-site-color'></i>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="quantity flex items-center gap-5 text-lg">
                            <button
                                className={`py-1 px-3 bg-gray-200 ${quantity == 1 ? "text-white bg-gray-300" : ""
                                    } text-xl font-bold hover:text-white hover:bg-gray-300`}
                                onClick={() => setquantity(quantity > 1 ? quantity - 1 : 1)}
                            >
                                -
                            </button>
                            <h2>{quantity}</h2>
                            <button
                                className={`py-1 px-3 bg-gray-200 ${quantity == 4 ? "text-white bg-gray-300" : ""
                                    } text-xl font-bold hover:text-white hover:bg-gray-300`}
                                onClick={() =>
                                    setquantity(quantity >= 4 ? 4 : quantity + 1)
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SingleCart