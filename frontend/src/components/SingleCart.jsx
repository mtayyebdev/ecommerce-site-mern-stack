import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { DeleteCart } from '../store/slices/cartSlices/DeleteCartSlice.jsx'
import { GetCart } from '../store/slices/cartSlices/GetCartSlice.jsx'
import { UpdateCart } from '../store/slices/cartSlices/UpdateCartSlice.jsx'

function SingleCart({ image, name, color, price, discountPrice, checkedHandler, isSelected, quantity, id }) {
    const dispatch = useDispatch()
    const [quantitynew, setquantitynew] = useState(quantity);

    const deleteCartHandler = async () => {
        await dispatch(DeleteCart(id))
        await dispatch(GetCart())
    }

    const updateHandler = async (id) => {
        const data = {
            quantity: quantitynew,
            id
        }
        await dispatch(UpdateCart(data))
        await dispatch(GetCart())
    }



    return (
        <>
            <div className="flex flex-col lg:flex-row bg-white text-black gap-3 justify-between py-[10px] px-3">
                <div className='flex flex-row gap-3'>
                    <input type="checkbox" checked={isSelected} name="box" id="box" onChange={(e) => checkedHandler(e, id)} />
                    <img src={image} alt="img" className='w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded' />
                    <div className='w-auto xl:w-[400px]'>
                        <h2 className='product-name text-sm'>{name}</h2>
                        <div className="flex items-center text-xs mt-1 text-gray-500">
                            <div className="brands">
                                <h2>No Brands</h2>
                            </div>
                            <p>,</p>
                            <div className="color flex items-center ms-1">
                                <h2>Color Family: </h2>
                                <h2>{color}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-6 mt-3 ms-6 md:ms-3 lg:ms-0 lg:mt-0'>
                    <div className="prices md:ms-4">
                        <div className="price text-lg text-site-color font-semibold whitespace-nowrap">Rs. {price}</div>
                        <div className="dicount-price line-through font-semibold text-gray-500">Rs. {discountPrice}</div>
                        <div className="flex items-center gap-3 text-gray-600 mt-1">
                            <i className='fa-regular text-lg fa-heart cursor-pointer hover:text-site-color'></i>
                            <i className='fa-solid fa-trash-alt cursor-pointer hover:text-site-color' onClick={deleteCartHandler}></i>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="quantity flex items-center gap-5 text-lg">
                            <button
                                className={`py-1 px-3 bg-gray-200 ${quantitynew == 1 ? "text-white bg-gray-300" : ""
                                    } text-xl font-bold hover:text-white hover:bg-gray-300`}
                                onClick={() => setquantitynew(quantitynew > 1 ? quantitynew - 1 : 1)}
                            >
                                -
                            </button>
                            <h2>{quantitynew}</h2>
                            <button
                                className={`py-1 px-3 bg-gray-200 ${quantitynew == 4 ? "text-white bg-gray-300" : ""
                                    } text-xl font-bold hover:text-white hover:bg-gray-300`}
                                onClick={() =>
                                    setquantitynew(quantitynew >= 4 ? 4 : quantitynew + 1)
                                }
                            >
                                +
                            </button>
                        </div>
                        <div className="update-cart">
                            <button className={`py-1 ${quantitynew == quantity ? "bg-[rgba(255,153,102,0.88)]" : "hover:bg-[rgba(248,87,6,0.88)] bg-site-color"} px-8.5  text-white mt-2 `} disabled={quantitynew == quantity} onClick={() => updateHandler(id)}>Update</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SingleCart