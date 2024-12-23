import React, { useState } from 'react'
import { SingleCart } from '../components/index.js'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GetCoupon } from '../store/slices/couponSlices/GetCouponSlice.jsx'
import { DeleteAllCarts } from '../store/slices/cartSlices/DeleteAllCartsSlice.jsx'
import { GetCart } from '../store/slices/cartSlices/GetCartSlice.jsx'
import { orderData } from '../store/slices/orderSlices/PendingOrderSlice.jsx'

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.getcart)

  const [allCheckedIDs, setallCheckedIDs] = useState([])
  const [totalPrice, settotalPrice] = useState(0)
  const [subTotalPrice, setsubTotalPrice] = useState(0)
  const [shippingFee, setshippingFee] = useState(0)
  const [discount, setdiscount] = useState(0)

  const [couponCode, setcouponCode] = useState("")

  function checkedHandler(e, id) {

    const isChecked = e.target.checked;

    const cartData = cart.data.find((cart) => cart._id === id);

    if (!cartData) {
      return null
    }

    if (isChecked) {
      setallCheckedIDs((prev) => [...prev, id])


      setsubTotalPrice((prev) => prev + cartData.price)
      setshippingFee((prev) => prev + cartData.deliveryPrice)
      settotalPrice((prev) => prev + cartData.price + cartData.deliveryPrice)
    } else {
      setallCheckedIDs(allCheckedIDs.filter((ids) => ids !== id))


      setsubTotalPrice((prev) => prev - cartData.price)
      setshippingFee((prev) => prev - cartData.deliveryPrice)
      settotalPrice((prev) => prev - cartData.price - cartData.deliveryPrice)


    }
  }

  const couponHandler = async () => {
    const data = {
      code: couponCode
    }
    await dispatch(GetCoupon(data))
      .then((res) => {
        if (res.type === "coupon/fulfilled") {
          setcouponCode("")
          const discount = res.payload.data.discount;
          setdiscount(discount)
          // discount formula =originalPrice - (originalPrice * (discountPercentage / 100))
          settotalPrice((prev) => (prev - (prev * (discount / 100))));

        }
      })
  }

  const deleteAllCartsHandler = async () => {
    await dispatch(DeleteAllCarts())
    await dispatch(GetCart())
  }

  const checkoutHandler = async () => {
    cart && cart.data.filter((d) => allCheckedIDs.includes(d._id)).map((data) => {
      const totaldata = {
        _id: data._id,
        name: data.name,
        image: data.image,
        price: discount > 0 ? data.price - (data.price * (discount / 100)) : data.price,
        discount: data.discount,
        deliveryPrice: data.deliveryPrice,
        color: data.color,
        size: data.size,
        quantity: data.quantity,
        category: data.category,
        guarantee: data.guarantee,
        productId: data.product,
        totalDiscount: discount,
        // totalDiscountPrice: data.price - (data.price * (discount / 100)),
      }
      return dispatch(orderData(totaldata))
    })
    navigate("/checkout")
  }


  return (
    <>
      <div className="w-full py-3">
        <div className="flex flex-col md:flex-row w-full justify-between gap-3">
          <div className="left w-full md:w-[60%] lg:w-[70%]">
            <div className="top flex items-center justify-between bg-white text-gray-600 py-[10px] px-3">
              <div className="left flex items-center gap-3">
                <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" />
                <label for="bordered-checkbox-1" className="text-xs uppercase hover:text-site-color cursor-pointer">Select All ({allCheckedIDs.length} item(s))
                </label>
              </div>
              <div className="right">
                <button className='flex items-center gap-2 hover:text-site-color' onClick={deleteAllCartsHandler}>
                  <i className='fa-solid fa-trash-alt text-sm'></i>
                  <h3 className='uppercase text-xs'> Delete</h3>
                </button>
              </div>
            </div>
            <div className="bottom all-carts flex flex-col gap-3 mt-3">
              {cart && cart.data.map((data, i) => {
                return (
                  <SingleCart name={data.name} price={data.price} discountPrice={data.discount} id={data._id} quantity={data.quantity} color={data.color} image={data.image} checkedHandler={checkedHandler} key={i} />
                )
              })}
            </div>
          </div>
          <div className="right w-full md:w-[40%] lg:w-[30%] bg-white px-3 py-3">
            <div className="location mb-3">
              <h2 className='text-base text-gray-500'>Location</h2>
              <div className="flex items-center gap-2 my-2">
                <i className='fa-solid fa-location-dot text-lg text-gray-500'></i>
                <p className='text-sm'>Kalu khan swabi kpk</p>
              </div>
            </div>
            <hr />
            <div className='mt-3'>
              <h2 className='font-semibold text-lg'>Order Summary</h2>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Subtotal ({allCheckedIDs.length} items)</h3>
                <h3>Rs. {subTotalPrice}</h3>
              </div>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Shipping Fee</h3>
                <h3>Rs. {shippingFee}</h3>
              </div>
            </div>
            <div className="coupon mt-6 flex items-center">
              <input type="text" value={couponCode} placeholder='Enter Voucher Code' onChange={(e) => setcouponCode(e.target.value)} className='py-[4.6px] w-full px-2 text-base outline-none border border-gray-400 focus:border-blue-500' />
              <button className='uppercase py-1.5 px-4 ms-3 bg-blue-400 hover:bg-blue-500 text-white text-base font-semibold' onClick={couponHandler}>Apply</button>
            </div>
            <div className="total mt-6 flex items-center justify-between">
              <h2>Total</h2>
              <h2 className='text-lg text-site-color font-semibold'>Rs. {totalPrice}</h2>
            </div>
            <div className="submit-btn mt-6">
              <button onClick={checkoutHandler} className='uppercase py-2 px-4 w-full bg-site-color hover:bg-orange-600 text-white font-semibold'>PROCEED TO CHECKOUT({allCheckedIDs.length})</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

