import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { UserData } from '../../store/slices/userSlices/UserdataSlice.jsx'
import { UpdateUser } from '../../store/slices/userSlices/UpdateUserSlice.jsx'
import { UpdatePassword } from '../../store/slices/userSlices/UpdatePasswordSlice.jsx'

function Profile() {
  const { user } = useSelector(state => state.userdata)
  const dispatch = useDispatch()
  const [profileData, setprofileData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthday: ""
  })
  const [allFields, setallFields] = useState(false)
  const [passwordField, setpasswordField] = useState(false)

  const [passwordData, setpasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const formHandler = (e) => {
    const { name, value } = e.target;
    setprofileData({
      ...profileData,
      [name]: value
    })
  }

  const passwordHandler = (e) => {
    const { name, value } = e.target;
    setpasswordData({
      ...passwordData,
      [name]: value
    })
  }

  const updateUserData = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (profileData.email !== "") {
      if (!emailRegex.test(profileData.email)) {
        toast.error('Please enter a valid email address')
        return
      }
    }
    if (profileData.phone !== "") {
      if (profileData.phone.length !== 11) {
        toast.error('Please enter a valid phone number')
        return
      }
    }
    setallFields(false)
    await dispatch(UpdateUser(profileData))
      .then((res) => {
        if (res.type === 'updateuser/fulfilled') {
          setallFields(false)
          dispatch(UserData())
        }
      })
  }

  const updatePasswordHandler = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password does not match')
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    await dispatch(UpdatePassword(passwordData))
      .then((res) => {
        if (res.type === 'updatepassword/fulfilled') {
          setpasswordField(false)
          dispatch(UserData())
        }
      })
  }

  return (
    <>
      <div className="w-full mt-3">
        <h1 className='text-2xl font-semibold mb-4'>My profile</h1>
        <div className="bg-white px-10 py-10 pb-14">
          {passwordField ? null :
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3">
              <div className="name">
                <h2 className='text-sm mb-1'>Full Name</h2>
                <p className={`${allFields ? "hidden" : "block"}`}>{user && user.data.name}</p>
                <div className={`relative ${allFields ? "block" : "hidden"}`}>
                  <input type="text" value={profileData.name} name='name' onChange={formHandler} placeholder='Enter your full name' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                  <i className='fa-solid fa-close absolute right-2 top-2 hover:text-blue-500 cursor-pointer'></i>
                </div>
              </div>
              <div className="email">
                <h2 className="text-sm mb-1">Email Address</h2>
                <p className={`${allFields ? "hidden" : "block"}`}>{user && user.data.email}</p>
                <div className={`relative ${allFields ? "block" : "hidden"}`}>
                  <input type="email" value={profileData.email} name='email' onChange={formHandler} placeholder='Enter your email' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                  <i className='fa-solid fa-close absolute right-2 top-2 hover:text-blue-500 cursor-pointer'></i>
                </div>
              </div>
              <div className="mobile">
                <h2 className="text-sm mb-1">Mobile</h2>
                <p className={`${allFields ? "hidden" : "block"}`}>+92 {user && user.data.phone}</p>
                <div className={`relative ${allFields ? "block" : "hidden"}`}>
                  <input type="phone" value={profileData.phone} name='phone' onChange={formHandler} placeholder='Enter your phone' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                  <i className='fa-solid fa-close absolute right-2 top-2 hover:text-blue-500 cursor-pointer'></i>
                </div>
                <div className="flex gap-2 text-sm mt-1 items-center">
                  <input type="checkbox" id="notifications" />
                  <label htmlFor="notifications">
                    <p className='cursor-pointer'>Receive marketing SMS</p>
                  </label>
                </div>
              </div>
              <div className="birthday">
                <h2 className='text-sm mb-1'>Birthday</h2>
                <p className={`${allFields ? "hidden" : "block"}`}>{user && user.data.birthday}</p>
                <div className={`relative ${allFields ? "block" : "hidden"}`}>
                  <input type="date" value={profileData.birthday} name='birthday' onChange={formHandler} placeholder='Enter your full name' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                </div>
              </div>
              <div className="gender">
                <h2 className='text-sm mb-1'>Gender</h2>
                <p className={`${allFields ? "hidden" : "block"}`}>{user && user.data.gender}</p>
                <div className="relative">
                  <select className={`bg-gray-50 border border-site-color text-gray-900 ${allFields ? "block" : "hidden"} outline-none text-sm focus:ring-blue-500 focus:border-blue-500 pe-5 py-2 px-2`} name="gender" onChange={formHandler}>
                    <option selected>Select Your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>}
          {passwordField &&
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3'>
                <div className="oldpassword">
                  <h2 className='text-sm mb-1'>Old Password</h2>
                  <div className={`relative block`}>
                    <input type="text" value={passwordData.oldPassword} name='oldPassword' onChange={passwordHandler} placeholder='Enter old password' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                    <i className='fa-solid fa-close absolute right-2 top-2 hover:text-blue-500 cursor-pointer'></i>
                  </div>
                </div>
                <div className="newpassword">
                  <h2 className='text-sm mb-1'>New Password</h2>
                  <div className={`relative block`}>
                    <input type="text" value={passwordData.newPassword} name='newPassword' onChange={passwordHandler} placeholder='Enter New password' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                    <i className='fa-solid fa-close absolute right-2 top-2 hover:text-blue-500 cursor-pointer'></i>
                  </div>
                </div>
                <div className="confirmpassword">
                  <h2 className='text-sm mb-1'>Confirm Password</h2>
                  <div className={`relative block`}>
                    <input type="text" value={passwordData.confirmPassword} name='confirmPassword' onChange={passwordHandler} placeholder='Confirm password' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                    <i className='fa-solid fa-close absolute right-2 top-2 hover:text-blue-500 cursor-pointer'></i>
                  </div>
                </div>
              </div>
            </>
          }
          <div className="btn mt-14 flex flex-col">
            {passwordField ? null :
              <>
                {allFields ?
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <button className='py-3 uppercase mt-5 w-[300px] bg-site-color text-white font-semibold' onClick={() => setallFields(false)}>CANCEL</button>
                    <button className='py-3 uppercase mt-5 w-[300px] bg-[rgb(26,156,183)] text-white font-semibold' onClick={updateUserData}>Save Changes</button>
                  </div>
                  :
                  <button className='py-3 uppercase w-[300px] bg-[rgb(26,156,183)] text-white font-semibold' onClick={() => setallFields(true)}>EDIT PROFILE</button>
                }
              </>}
            {allFields ? null :
              <>
                {passwordField ?
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <button className='py-3 uppercase mt-5 w-[300px] bg-site-color text-white font-semibold' onClick={() => setpasswordField(false)}>CANCEL</button>
                    <button className='py-3 uppercase mt-5 w-[300px] bg-[rgb(26,156,183)] text-white font-semibold' onClick={updatePasswordHandler}>Save Changes</button>
                  </div>
                  :
                  <button className='py-3 uppercase mt-5 w-[300px] bg-[rgb(26,156,183)] text-white font-semibold' onClick={() => setpasswordField(true)}>CHANGE PASSWORD</button>
                }
              </>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile