import React from 'react'
import { CheckoutCart } from '../components/index.js'
import { Link } from 'react-router-dom'

function Checkout() {
  return (
    <>
      <div className="w-full py-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="left w-full md:w-[60%] lg:w-[70%]">
            <div className="address bg-white">
              {/* Shipping & Billing Header */}
              <div className="flex justify-between items-center bg-[rgb(250,250,250)] px-3 py-2">
                <h4 className="text-sm font-semibold">Shipping & Billing</h4>
                <button className="text-blue-500 hover:underline text-sm">EDIT</button>
              </div>

              {/* User Info */}
              <div className='px-3 py-3 pb-4'>
                <div className="mb-2 flex items-center gap-5 text-sm">
                  <p>Muhammad Tayyeb</p>
                  <p>3368212215</p>
                </div>

                {/* Address Info */}
                <div className="flex items-center">
                  {/* Home Badge */}
                  <span className="bg-site-color text-white text-xs font-semibold px-3 py-1 rounded-full mr-2">HOME</span>

                  {/* Address */}
                  <p className="text-sm text-gray-600">
                    kalu Khan khat kali, Kalu Khan, Swabi, Khyber Pakhtunkhwa
                  </p>
                </div>
              </div>
            </div>
            <div className="carts flex flex-col gap-3 mt-3">
              <CheckoutCart />
              <CheckoutCart />
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
                <h3 className='text-gray-500'>Items Total (3 items)</h3>
                <h3>Rs. 0</h3>
              </div>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Delivery Fee</h3>
                <h3>Rs. 0</h3>
              </div>
            </div>

            <div className="total mt-6 flex items-center justify-between">
              <h2>Total:</h2>
              <h2 className='text-lg text-site-color font-semibold'>Rs. 456</h2>
            </div>
            <div className="submit-btn mt-6">
              <Link to={"/payment"}>
              <button className='py-2 px-4 w-full bg-site-color hover:bg-orange-600 text-white font-semibold'>Proceed to Pay</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout