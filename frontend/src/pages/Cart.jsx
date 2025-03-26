import React, { useState, useEffect } from 'react'
import { SingleCart } from '../components/index.js'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GetCoupon } from '../store/slices/couponSlices/GetCouponSlice.jsx'
import { DeleteAllCarts } from '../store/slices/cartSlices/DeleteAllCartsSlice.jsx'
import { GetCart } from '../store/slices/cartSlices/GetCartSlice.jsx'
import { orderData } from '../store/slices/orderSlices/PendingOrderSlice.jsx'
import { GetUserInfo } from '../store/slices/userSlices/GetUserInfoSlice.jsx'

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const checkref =useRef(null)
  const { data } = useSelector((state) => state.getuserinfo)
  const { cart } = useSelector((state) => state.getcart)

  const [allCheckedIDs, setallCheckedIDs] = useState([])
  const [totalPrice, settotalPrice] = useState(0)
  const [subTotalPrice, setsubTotalPrice] = useState(0)
  const [couponChecked, setcouponChecked] = useState(false)
  const [shippingFee, setshippingFee] = useState(0)
  const [discount, setdiscount] = useState(0)
  const [oldPrice, setoldPrice] = useState(0)
  const [allProductsQuantity, setallProductsQuantity] = useState(0)

  const [couponCode, setcouponCode] = useState("")

  function checkedHandler(e, id) {
    const isChecked = e.target.checked;
    const cartData = cart.data.find((cart) => cart._id === id);

    if (!cartData) {
      return null
    }

    if (isChecked) {
      setallCheckedIDs((prev) => {
        if (!prev.includes(id)) {
          return [...prev, id];
        }
        return prev;
      });
      const totalPrice = cartData.quantity * cartData.price;
      const totalDeliveryPrice = cartData.quantity * cartData.deliveryPrice;
      setsubTotalPrice((prev) => prev + totalPrice)
      setshippingFee((prev) => prev + totalDeliveryPrice)
      settotalPrice((prev) => prev + totalPrice + totalDeliveryPrice)
      setallProductsQuantity((prev)=>prev+cartData.quantity)
    } else {
      setallCheckedIDs((prev) => {
        const updatedIDs = prev.filter((ids) => ids !== id);

        if (updatedIDs.length === 0) {
          setsubTotalPrice(0);
          setshippingFee(0);
          settotalPrice(0);
          setallProductsQuantity(0)
          setcouponChecked(false)
        } else {
          const totalPrice = cartData.quantity * cartData.price;
          const totalDeliveryPrice = cartData.quantity * cartData.deliveryPrice;
          setsubTotalPrice((prev) => prev - totalPrice);
          setshippingFee((prev) => prev - totalDeliveryPrice);
          settotalPrice((prev) => prev - totalPrice - totalDeliveryPrice);
          setallProductsQuantity((prev)=>prev-cartData.quantity)
        }
        return updatedIDs;
      });
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
          setoldPrice(subTotalPrice)
          setsubTotalPrice((prev) => (prev - (prev * (discount / 100))));
          setcouponChecked(true)

        }
      })
  }

  const deleteAllCartsHandler = async () => {
    await dispatch(DeleteAllCarts())
    await dispatch(GetCart())
  }

  useEffect(() => {
    dispatch(GetUserInfo())
  }, [])

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
        returns:data.returns,
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

  const userInfo = data && data.filter((defAddress) => defAddress.defaultAddress === true)

  const checkAllHandler = (e) => {
    if (e.target.checked) {
      const allCartsIds = cart.data.map((item) => item._id)
      setallCheckedIDs(allCartsIds)
      setsubTotalPrice(0)
      setshippingFee(0)
      settotalPrice(0)
      setallProductsQuantity(0)

      cart.data.map((item) => {
        const totalPrice = item.quantity * item.price;
        const totalDeliveryPrice = item.quantity * item.deliveryPrice;
        setsubTotalPrice((prev) => prev + totalPrice)
        setshippingFee((prev) => prev + totalDeliveryPrice)
        settotalPrice((prev) => prev + totalPrice + totalDeliveryPrice)
        setallProductsQuantity((prev)=>prev+item.quantity)
      })
    } else {
      setallCheckedIDs([])
      setsubTotalPrice(0)
      setshippingFee(0)
      settotalPrice(0)
      setallProductsQuantity(0)
      setcouponChecked(false)
    }
  }


  return (
    <>
      <div className="w-full py-3">
        <div className="flex flex-col md:flex-row w-full justify-between gap-3">
          <div className="left w-full md:w-[60%] lg:w-[70%]">
            <div className="top flex items-center justify-between bg-white text-gray-600 py-[10px] px-3">
              <div className="left flex items-center gap-3">
                <input id="bordered-checkbox-1" type="checkbox" onClick={(e) => checkAllHandler(e)} name="bordered-checkbox" />
                <label for="bordered-checkbox-1" className="text-xs uppercase hover:text-site-color cursor-pointer">Select All ({allProductsQuantity} item(s))
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
                  <SingleCart name={data.name} price={data.price} discountPrice={data.discount} id={data._id} quantity={data.quantity} color={data.color} isSelected={allCheckedIDs.includes(data._id)} image={data.image} checkedHandler={checkedHandler} key={i} />
                )
              })}
            </div>
          </div>
          <div className="right w-full md:w-[40%] lg:w-[30%] bg-white px-3 py-3">
            <div className="location mb-3">
              <h2 className='text-base text-gray-500'>Location</h2>
              <div className="flex items-center gap-2 my-2">
                {/* //................................................................. */}
                <i className='fa-solid fa-location-dot text-lg text-gray-500'></i>
                {userInfo ? <p className='text-sm'>{userInfo[0].country}, {userInfo[0].province}, {userInfo[0].city}, {userInfo[0].zone}</p> : ""}
              </div>
            </div>
            <hr />
            <div className='mt-3'>
              <h2 className='font-semibold text-lg'>Order Summary</h2>
              <div className="flex items-start justify-between mt-2">
                <h3 className='text-gray-500'>Subtotal ({allProductsQuantity} items)</h3>
                <div className="flex flex-col">
                <h3>Rs. {subTotalPrice}</h3>
                {couponChecked&&<h2 className='text-[15px] text-gray-500 line-through'>Rs. {oldPrice}</h2>}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Shipping Fee</h3>
                <h3>Rs. {shippingFee}</h3>
              </div>
            </div>
            <div className="coupon mt-6 flex items-center">
              <input type="text" disabled={couponChecked} value={couponCode} placeholder='Enter Voucher Code' onChange={(e) => setcouponCode(e.target.value)} className='py-[4.6px] w-full px-2 text-base outline-none border border-gray-400 focus:border-blue-500' />
              <button className={`uppercase py-1.5 px-4 ms-3 ${couponChecked ? "bg-blue-400" : "bg-blue-400 hover:bg-blue-500"}  text-white text-base font-semibold`} disabled={couponChecked} onClick={couponHandler}>Apply</button>
            </div>
            {/* {couponChecked ? <p className='text-red-600 text-sm'>Coupon code already applied.</p> : ""} */}
            <div className="total mt-6 flex items-start justify-between">
              <h2>Total</h2>
              <h2 className='text-lg text-site-color font-semibold'>Rs. {subTotalPrice+shippingFee}</h2>
            </div>
            <div className="submit-btn mt-6">
              <button onClick={checkoutHandler} className='uppercase py-2 px-4 w-full bg-site-color hover:bg-orange-600 text-white font-semibold'>PROCEED TO CHECKOUT({allProductsQuantity})</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

