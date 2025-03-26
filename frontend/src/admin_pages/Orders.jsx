import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateOrderStatus } from '../store/slices/adminSlices/UpdateOrderStatusSlice.jsx'
import { DeleteOrder } from '../store/slices/adminSlices/DeleteOrderSlice.jsx'
import { GetOrders } from '../store/slices/adminSlices/GetOrdersSlice.jsx'

function Orders() {
  const { orders } = useSelector((state) => state.getadminorders);
  const dispatch = useDispatch();
  const [preview, setpreview] = useState(false)
  const [singleOrder, setsingleOrder] = useState(null)

  const [allOrders, setallOrders] = useState([])
  const [searchId, setsearchId] = useState("")

  useEffect(() => {
    setallOrders(orders && [...orders.data].reverse())
  }, [orders])

  const updateOrderHandler = async (orderStatus, oldValue, id) => {
    if (orderStatus != oldValue) {
      const data = {
        orderStatus,
        id
      }
      await dispatch(UpdateOrderStatus(data))
        .then((res) => {
          if (res.type === "updateorderstatus/fulfilled") {
            dispatch(GetOrders())
          }
        })
    }
  }

  const deleteOrder = async (id) => {
    await dispatch(DeleteOrder(id))
      .then((res) => {
        if (res.type === "deleteorder/fulfilled") {
          dispatch(GetOrders())
        }
      })
  }

  const searchOrderHandler = () => {
    const filterOrder = orders && orders.data.filter((order) => order.orderId.includes(searchId))

    setallOrders(filterOrder)
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <h2 className='text-xl font-semibold'>All Orders</h2>
        <div className=' w-[8rem] h-0.5 mt-1 bg-blue-600'></div>
      </div>

      <div className={`${preview ? "hidden" : "block"
        }`}>
        <div className="box max-w-md mt-4">
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="number" id="default-search" className="block outline-none w-full py-3 px-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for Id..." value={searchId} onChange={(e) => setsearchId(e.target.value)} required />
            <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5" onClick={searchOrderHandler}>Search</button>
          </div>
          <h2 className='mt-1 font-semibold'>Total Orders: {allOrders && allOrders.length}</h2>
        </div>

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Preview
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {
                allOrders && allOrders.map((order, i) => (
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
                      Rs.{order.price}
                    </td>
                    <td className="px-6 py-4">
                      {order.paymentStatus}
                    </td>
                    <td className="px-6 py-4">
                      {order.status}
                    </td>
                    <td className="px-6 py-4">
                      <i className='fa-solid fa-eye cursor-pointer hover:text-site-color text-base'
                        onClick={() => { setpreview(true); setsingleOrder(order) }}></i>
                    </td>
                    <td className="px-6 py-4">
                      <select name="edit" id="edit" className='bg-transparent border border-blue-600 outline-none' onChange={(e) => updateOrderHandler(e.target.value, order.status, order._id)}>
                        <option selected >{order.status}</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="On Route">On Route</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <i className='fa-solid fa-trash-alt cursor-pointer hover:text-site-color text-base' onClick={() => deleteOrder(order._id)}></i>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className={`w-full absolute ${preview ? "flex" : "hidden"} items-center justify-center top-0 left-0 z-999999 bg-white/25 backdrop-blur-sm overflow-hidden`}>
        <i className='fa-solid fa-close text-xl absolute top-7 right-8 text-black hover:text-primary cursor-pointer' onClick={() => setpreview(false)}></i>
        <div class="max-w-7xl mx-auto p-4">
          {/* <!-- Order Details Table --> */}
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse bg-white shadow-md rounded-lg">
                <tbody class="text-gray-600">
                  {/* <!-- Order Identification --> */}
                  <tr class="border-b hover:bg-gray-50 bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Order Id</th>
                    <td class="p-4">{singleOrder && singleOrder.orderId}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Name</th>
                    <td class="p-4">{singleOrder && singleOrder.name}</td>
                  </tr>

                  {/* <!-- Product Details --> */}
                  <tr class="border-b hover:bg-gray-50 bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Category</th>
                    <td class="p-4">{singleOrder && singleOrder.category}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Quantity</th>
                    <td class="p-4">{singleOrder && singleOrder.quantity}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Size</th>
                    <td class="p-4">{singleOrder && singleOrder.size}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Color</th>
                    <td class="p-4">{singleOrder && singleOrder.color}</td>
                  </tr>

                  {/* <!-- Pricing Details --> */}
                  <tr class="border-b hover:bg-gray-50 bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Price</th>
                    <td class="p-4">{singleOrder && singleOrder.price}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Shipping Fee</th>
                    <td class="p-4">{singleOrder && singleOrder.shippingFee}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Total Discount</th>
                    <td class="p-4">{singleOrder && singleOrder.totalDiscount}%</td>
                  </tr>

                  {/* <!-- Order Status --> */}
                  <tr class="border-b hover:bg-gray-50 bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Order Status</th>
                    <td class="p-4">{singleOrder && singleOrder.status}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Delivery Date</th>
                    <td class="p-4">{singleOrder && singleOrder.deliveryDate}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Return</th>
                    <td class="p-4">{singleOrder && singleOrder.returns}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Created Date</th>
                    <td class="p-4">{singleOrder && singleOrder.created_date}</td>
                  </tr>

                  {/* <!-- Payment Details --> */}
                  <tr class="border-b hover:bg-gray-50 bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Payment Status</th>
                    <td class="p-4">{singleOrder && singleOrder.paymentStatus}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Payment Type</th>
                    <td class="p-4">{singleOrder && singleOrder.paymentType}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <!-- User Info Table --> */}
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">User Information</h2>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse bg-white shadow-md rounded-lg">
                <tbody class="text-gray-600">
                  {/* <!-- User Identification --> */}
                  <tr class="border-b hover:bg-gray-50 bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Username</th>
                    <td class="p-4">{singleOrder && singleOrder.username}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Phone</th>
                    <td class="p-4">{singleOrder && singleOrder.phone}</td>
                  </tr>

                  {/* <!-- Delivery Address --> */}
                  <tr class="border-b hover:bg-gray-50 bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Address</th>
                    <td class="p-4">{singleOrder && singleOrder.address}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">City</th>
                    <td class="p-4">{singleOrder && singleOrder.city}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Zone</th>
                    <td class="p-4">{singleOrder && singleOrder.zone}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Province</th>
                    <td class="p-4">{singleOrder && singleOrder.province}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Country</th>
                    <td class="p-4">{singleOrder && singleOrder.country}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Delivery Place</th>
                    <td class="p-4">{singleOrder && singleOrder.deliveryPlace}</td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <th class="p-4 text-left font-semibold text-lg">Landmark</th>
                    <td class="p-4">{singleOrder && singleOrder.landmark}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <!-- Product Image --> */}
          <div class="mt-5">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Product Image</h2>
            <div class="bg-white shadow-md rounded-lg p-4">
              {singleOrder && singleOrder.image ? (
                <img src={singleOrder.image} class="w-[200px] h-auto rounded-md" alt="Product" />
              ) : (
                <p class="text-gray-600">No Image Found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders