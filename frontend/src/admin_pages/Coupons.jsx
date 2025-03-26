import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteCoupon } from '../store/slices/adminSlices/DeleteCouponSlice.jsx'
import { GetCoupons } from '../store/slices/adminSlices/GetCouponsSlice.jsx'

function Coupons() {
  const { coupons } = useSelector((state) => state.getadmincoupons)
  const dispatch = useDispatch();

  const ReverseCoupons = coupons && [...coupons.data].reverse()

  const deleteCoupon = async (id) => {
    await dispatch(DeleteCoupon(id))
      .then((res) => {
        if (res.type == "deletecoupon/fulfilled") {
          dispatch(GetCoupons())
        }
      })
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <h2 className='text-xl font-semibold'>All Coupons</h2>
        <div className=' w-[9rem] h-0.5 mt-1 bg-blue-600'></div>
      </div>
      <h2 className='mt-2 font-semibold'>All Coupons: {ReverseCoupons && ReverseCoupons.length}</h2>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Expire In
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>


          <tbody>
            {
              ReverseCoupons && ReverseCoupons.map((coupon, i) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {coupon.name}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {coupon.code}
                  </td>
                  <td className="px-6 py-4">
                    {coupon.discount}
                  </td>
                  <td className="px-6 py-4">
                    {coupon.expire}
                  </td>
                  <td className="px-6 py-4">
                    <i className='fa-solid fa-trash-alt hover:text-site-color cursor-pointer' onClick={() => deleteCoupon(coupon._id)}></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Coupons

