import React, { useState, useEffect } from 'react'
import { CheckoutCart } from '../components/index.js'
import { Link, useNavigate } from 'react-router-dom'
import AddressForm from '../components/AddressForm';
import { useSelector, useDispatch } from 'react-redux'
import { UpdateUserInfo } from '../store/slices/userSlices/UpdateUserInfoSlice.jsx'
import { GetUserInfo } from '../store/slices/userSlices/GetUserInfoSlice.jsx'
import { ClearData, DeleteOrderData, orderData } from '../store/slices/orderSlices/PendingOrderSlice.jsx'
import { CreateOrder } from '../store/slices/orderSlices/CreateOrderSlice.jsx'

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [totalPrice, settotalPrice] = useState(0)
  const [totalShippingFee, settotalShippingFee] = useState(0)
  const [subItemsPrice, setsubItemsPrice] = useState(0)
  const { orders } = useSelector((state) => state.pendingorder)
  const { data } = useSelector((state) => state.getuserinfo)
  const [formId, setformId] = useState()
  const [addressForm, setaddressForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    country: '',
    zone: '',
    landmark: '',
    phoneNumber: '',
    addressType: 'Home'
  });


  const infoData = data && data.find((info) => info.defaultAddress === true);


  useEffect(() => {
    dispatch(GetUserInfo())

    let totalShipping = 0
    let subItems = 0
    let discount = 0
    orders.forEach((order, i) => {
      discount = order.totalDiscount;
      totalShipping += order.deliveryPrice;
      subItems += order.price;
    })
    let total = subItems + totalShipping;
    settotalShippingFee(totalShipping)
    setsubItemsPrice(subItems)
    settotalPrice(total)
  }, [orders])

  const deleteHandler = (id) => {
    dispatch(DeleteOrderData(id))
  }


  const orderHandler = async () => {
    const data = {
      orders,
      infoData
    }
    await dispatch(CreateOrder(data))
      .then(async (res) => {
        if (res.type === "createorder/fulfilled") {

          await dispatch(ClearData());
          await dispatch(orderData(res.payload.ids));


          navigate('/payment/1234');
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = async (word) => {
    const data = {
      id: formId,
      data: formData
    }
    await dispatch(UpdateUserInfo(data))
      .then((res) => {
        if (res.type === 'updateuserinfo/fulfilled') {
          setaddressForm(false);
          dispatch(GetUserInfo());
        }
      })
    setformId(null);
  };

  const editFormHandler = (id) => {
    setformId(id)
    setaddressForm(true)
  }



  return (
    <>
      <div className={`w-full ${addressForm?"hidden":"block"} py-4`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="left w-full md:w-[60%] lg:w-[70%]">
            <div className="address bg-white">
              {/* Shipping & Billing Header */}
              <div className="flex justify-between items-center bg-[rgb(250,250,250)] px-3 py-2">
                <h4 className="text-sm font-semibold">Shipping & Billing</h4>
                <button className="text-blue-500 hover:underline text-sm" onClick={() => editFormHandler(infoData._id)}>EDIT</button>
              </div>

              {/* User Info */}
              <div className='px-3 py-3 pb-4'>
                <div className="mb-2 flex items-center gap-5 text-sm">
                  <p>{infoData && infoData.name}</p>
                  <p>{infoData && infoData.phone}</p>
                </div>

                {/* Address Info */}
                <div className="flex items-center">
                  {/* Home Badge */}
                  <span className={`${infoData && infoData.addressType == "Home" ? "bg-site-color" : "bg-blue-600"} text-white text-xs font-semibold px-3 py-1 rounded-full mr-2`}>{infoData && infoData.addressType}</span>

                  {/* Address */}
                  <p className="text-sm text-gray-600">
                    {infoData && infoData.address}, {infoData && infoData.zone}, {infoData && infoData.city}, {infoData && infoData.province}, {infoData && infoData.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="carts flex flex-col gap-3 mt-3">
              {orders && orders.map((data, i) => {
                return <CheckoutCart key={i} data={data} deleteHandler={deleteHandler} />
              })}
            </div>
          </div>
          <div className="right w-full md:w-[40%] lg:w-[30%] flex-shrink-0 h-[390px] bg-white py-3 px-3">
            <div className="promotions">
              <h2 className='text-lg font-semibold mb-2'>Promotion</h2>
              <div className="flex items-center">
                <input type="text" placeholder='Enter Shophub Code' className='py-[4.6px] w-full px-2 text-base outline-none border border-gray-400 focus:border-blue-500' />
                <button className='uppercase py-1.5 px-4 ms-3 bg-blue-400 hover:bg-blue-500 text-white text-base font-semibold'>Apply</button>
              </div>
            </div>
            <div className="location my-6 flex items-center justify-between">
              <h2 className='text-lg font-semibold'>Invoice and Contact Info</h2>
              <Link to={"/"} className='text-blue-600 hover:underline text-base'>Edit</Link>
            </div>
            <div className='mt-3'>
              <h2 className='font-semibold text-lg'>Order Summary</h2>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Items Total ({orders.length} items)</h3>
                <h3>Rs. {subItemsPrice}</h3>
              </div>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Delivery Fee</h3>
                <h3>Rs. {totalShippingFee}</h3>
              </div>
            </div>

            <div className="total mt-6 flex items-center justify-between">
              <h2>Total:</h2>
              <h2 className='text-lg text-site-color font-semibold'>Rs. {totalPrice}</h2>
            </div>
            <div className="submit-btn mt-6">
              <button onClick={orderHandler} className='py-2 px-4 w-full bg-site-color hover:bg-orange-600 text-white font-semibold'>Proceed to Pay</button>
            </div>
          </div>
        </div>
      </div>
      {addressForm && <AddressForm setaddressForm={setaddressForm} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} setformId={setformId} formTitle="Edit Address" formId={formId} />}
    </>
  )
}

export default Checkout