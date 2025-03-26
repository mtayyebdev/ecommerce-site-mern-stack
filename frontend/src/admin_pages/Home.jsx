import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetOrders } from '../store/slices/adminSlices/GetOrdersSlice.jsx'

function Home() {
  const { orders } = useSelector((state) => state.getadminorders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetOrders())
  }, [])

  const ReversedOrders = orders && [...orders.data].reverse();


  return (
    <>
      <div className="w-full">
        <div>
          <h2 className='text-xl font-semibold'>Recent Orders</h2>
          <div className=' w-[11rem] h-0.5 mt-1 bg-blue-600'></div>
        </div>


        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {
                ReversedOrders && ReversedOrders.map((order, i) => (
                  <tr className="bg-white border-b hover:bg-gray-50" key={i}>
                    <td className="px-6 py-4">
                      {order.orderId}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.name.slice(0, 38)}
                    </th>
                    <td className="px-6 py-4">
                      {order.category}
                    </td>
                    <td className="px-6 py-4">
                      {order.paymentStatus}
                    </td>
                    <td className="px-6 py-4">
                      {order.status}
                    </td>
                    <td className="px-6 py-4">
                      Rs.{order.price}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Home