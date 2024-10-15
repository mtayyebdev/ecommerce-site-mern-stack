import React from 'react'
import { ProfileOrder } from '../../components/index.js'

function Orders() {
  return (
    <>
      <div className="w-full mt-3">
        <h2 className='text-2xl font-semibold'>My Orders</h2>
        <div className="flex flex-col gap-4 mt-4">
          <ProfileOrder />
          <ProfileOrder />
          <ProfileOrder />
        </div>
      </div>
    </>
  )
}

export default Orders