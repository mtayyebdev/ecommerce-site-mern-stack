import React, { useState, useEffect } from 'react'
import { ProfileOrder } from '../../components/index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Orders() {
  const { orders } = useSelector(state => state.getorders)
  const { user } = useSelector((state) => state.userdata)

  const [allOrders, setallOrders] = useState([]);

  const topOrdersHandler = () => {
    setallOrders(orders && [...orders.data].reverse())
  }

  const completedOrdersHandler = () => {
    setallOrders(orders && [...orders.data].filter((order) => order.status == "Delivered"))
  }

  const cancelledOrdersHandler = () => {
    setallOrders(orders && [...orders.data].filter((order) => order.status == "Cancelled"))
  }

  const pendingOrdersHandler = () => {
    setallOrders(orders && [...orders.data].filter((order) => order.status == "Pending"))
  }

  const onRoutOrdersHandler = () => {
    setallOrders(orders && [...orders.data].filter((order) => order.status == "OnRoute"))
  }

  const returnOrdersHandler = () => {
    setallOrders(orders && [...orders.data].filter((order) => order.status == "Returned"))
  }

  useEffect(() => {
    setallOrders(orders && [...orders.data].reverse())
  }, [orders])


  return (
    <>
      <div className="w-full mt-3">
        <h2 className='text-2xl font-semibold'>My Orders</h2>
        <div className="flex items-center mt-4">
          <ul className='flex items-center gap-4 sm:gap-5 md:gap-7'>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={topOrdersHandler}>All</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={completedOrdersHandler}>Completed</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={cancelledOrdersHandler}>Cancelled</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={pendingOrdersHandler}>Pending</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={onRoutOrdersHandler}>OnRout</li>
            <li className='font-semibold hover:text-blue-500 cursor-pointer' onClick={returnOrdersHandler}>Returns</li>
          </ul>
        </div>
        <hr className='border-1 border-gray-700 mt-1' />
        <div className="flex flex-col gap-4 mt-4">
          {
            allOrders && allOrders.length !=0 ? allOrders.map((order, i) => (
              <ProfileOrder key={i} image={order.image} name={order.name} price={order.price} quantity={order.quantity} status={order.status} username={user && user.data.name} id={order._id} />
            )):
            <>
            <div className='w-full h-full flex items-center flex-col justify-center py-10'>
              <h2>There are no orders placed yet.</h2>
              <Link to="/"><button className='py-2 px-6 mt-3 bg-site-color/90 text-white cursor-pointer hover:bg-site-color'>CONTINUE SHOPPING</button></Link>
            </div>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Orders