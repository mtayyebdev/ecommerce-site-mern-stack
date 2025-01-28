import React, { useEffect, useState } from 'react'
import { ProfileOrder } from '../../components/index.js'
import { useSelector, useDispatch } from 'react-redux'
import { GetOrders } from '../../store/slices/orderSlices/GetOrdersSlice.jsx'

function Orders() {
  const dispatch = useDispatch()

  const { orders } = useSelector(state => state.getorders)
  const { user } = useSelector((state) => state.userdata)

  const [allOrders, setallOrders] = useState(orders && [...orders.data].reverse());

  useEffect(async () => {
    await dispatch(GetOrders())
    // .then((res) => {
    //   console.log("ja");

    // })
    // setallOrders(orders && [...orders.data].reverse())
    // dispatch(GetUserInfo());
  }, [])
  // console.log(allOrders);


  const topOrdersHandler = () => {
    console.log("topOrdersHandler");
    console.log(allOrders);
  }

  const completedOrdersHandler = () => {
    console.log("completedOrdersHandler");
    setallOrders((prev) => prev.filter((order) => order.status === "Compleated"))
  }

  const cancelledOrdersHandler = () => {
    console.log("cancelledOrdersHandler");
    setallOrders((prev) => prev.filter((order) => order.status === "Cancelled"))
  }

  const pendingOrdersHandler = () => {
    console.log("pendingOrdersHandler");
    setallOrders((prev) => prev.filter((order) => order.status === "Pending"))
  }

  const onRoutOrdersHandler = () => {
    console.log("onRoutOrdersHandler");
    setallOrders((prev) => prev.filter((order) => order.status === "onRout"))
  }

  return (
    <>
      <div className="w-full mt-3">
        <h2 className='text-2xl font-semibold'>My Orders</h2>
        <div className="flex items-center mt-4">
          <ul className='flex items-center gap-4 sm:gap-5 md:gap-7'>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={topOrdersHandler}>Top Orders</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={completedOrdersHandler}>Completed</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={cancelledOrdersHandler}>Cancelled</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={pendingOrdersHandler}>Pending</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={onRoutOrdersHandler}>OnRout</li>
          </ul>
        </div>
        <hr className='border-1 border-gray-700 mt-1' />
        <div className="flex flex-col gap-4 mt-4">
          {
            allOrders && allOrders.map((order, i) => (
              <ProfileOrder key={i} image={order.image} name={order.name} price={order.price} quantity={order.quantity} status={order.status} username={user && user.data.name} id={order._id} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Orders