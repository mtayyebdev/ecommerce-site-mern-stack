import React from 'react'
import {SingleCart} from '../components/index.js'
import { Link } from 'react-router-dom'

function Cart() {
  return (
    <>
      <div className="w-full py-3">
        <div className="flex flex-col md:flex-row w-full justify-between gap-3">
          <div className="left w-full md:w-[60%] lg:w-[70%]">
            <div className="top flex items-center justify-between bg-white text-gray-600 py-[10px] px-3">
              <div className="left flex items-center gap-3">
                <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" />
                <label for="bordered-checkbox-1" className="text-xs uppercase hover:text-site-color cursor-pointer">Select All (1 item(s))
                </label>
              </div>
              <div className="right">
                <button className='flex items-center gap-2 hover:text-site-color'>
                  <i className='fa-solid fa-trash-alt text-sm'></i>
                  <h3 className='uppercase text-xs'> Delete</h3>
                </button>
              </div>
            </div>
            <div className="bottom all-carts flex flex-col gap-3 mt-3">
              <SingleCart/>
              <SingleCart/>
              <SingleCart/>
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
            <hr/>
            <div className='mt-3'>
              <h2 className='font-semibold text-lg'>Order Summary</h2>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Subtotal (0 items)</h3>
                <h3>Rs. 0</h3>
              </div>
              <div className="flex items-center justify-between mt-2">
                <h3 className='text-gray-500'>Shipping Fee</h3>
                <h3>Rs. 0</h3>
              </div>
            </div>
            <div className="coupon mt-6 flex items-center">
              <input type="text" placeholder='Enter Voucher Code' className='py-[4.6px] w-full px-2 text-base outline-none border border-gray-400 focus:border-blue-500' />
              <button className='uppercase py-1.5 px-4 ms-3 bg-blue-400 hover:bg-blue-500 text-white text-base font-semibold'>Apply</button>
            </div>
            <div className="total mt-6 flex items-center justify-between">
              <h2>Total</h2>
              <h2 className='text-lg text-site-color font-semibold'>Rs. 456</h2>
            </div>
            <div className="submit-btn mt-6">
              <Link to={"/checkout"}><button className='uppercase py-2 px-4 w-full bg-site-color hover:bg-orange-600 text-white font-semibold'>PROCEED TO CHECKOUT(2)</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

