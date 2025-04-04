import React, { useState,useEffect } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserInfo } from '../store/slices/userSlices/GetUserInfoSlice.jsx'
import { GetOrders } from '../store/slices/orderSlices/GetOrdersSlice.jsx'

function Profile() {
  const { user } = useSelector((state) => state.userdata)
  const [menu, setmenu] = useState(false)
  const dispatch =useDispatch()

  useEffect(() => {
    dispatch(GetUserInfo())
    dispatch(GetOrders())
  }, [])
  

  return (
    <>
      <div className="w-full py-5">
        <div className="flex flex-row gap-3">
          <div className="asid relative">
            <div className="flex items-center lg:hidden gap-2 py-1 px-3 bg-site-color hover:bg-orange-600 text-white flex-row left-3 cursor-pointer absolute rounded-md" onClick={() => setmenu(true)}>
              <i className='fa-solid fa-bars text-lg'></i>
            </div>
            <aside className={`w-64 lg:w-[200px] p-3 absolute lg:static bg-white top-0 h-full min-h-[450px] lg:bg-transparent shadow-md lg:shadow-none rounded-lg lg:rounded-none ${menu ? "translate-x-0" : "-translate-x-[200%]"} transition-all lg:block lg:translate-x-0`}>
              <i className='fa-solid fa-close absolute right-5 top-3 text-lg hover:text-blue-500 cursor-pointer lg:hidden' onClick={() => setmenu(false)}></i>
              <div className="mb-6">
                <h2 className="text-xs font-semibold">Hello, {user && user.data.name}</h2>
                {
                  user && user.data.isVerified ? <div className="flex items-center text-sm text-green-600">
                    <i className='fa-solid fa-check-circle mr-1 text-lg'></i>
                    Verified Account
                  </div> : <div className="flex items-center text-sm text-red-600">
                    <i className='fa-solid fa-exclamation-circle mr-1 text-lg'></i>
                    Unverified Account
                  </div>
                }
              </div>
              <nav>
                <NavLink to={"/user"}>
                  <h3 className="mb-2 font-semibold">Manage My Account</h3>
                </NavLink>
                <ul className="space-y-2 ms-4 text-sm">
                  <NavLink to={"/user/profile"}><li className=" hover:text-blue-600">My Profile</li></NavLink>
                  <NavLink to={"/user/address"}><li className=" hover:text-blue-600">Address Book</li></NavLink>
                </ul>
                <NavLink to={"/user/orders"}><h3 className="mb-2 mt-4 font-semibold">My Orders</h3></NavLink>
                <NavLink to={"/user/reviews"}><h3 className="mb-2 mt-4 font-semibold">My Reviews</h3></NavLink>
                <NavLink to={"/user/favorits"}><h3 className="mb-2 mt-4 font-semibold">My Wishlist</h3></NavLink>
              </nav>
            </aside>
          </div>
          <main className="w-full mt-9 lg:mt-0">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default Profile
