import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  const [Name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [birthday, setBirthday] = useState("")
  const [allFields, setallFields] = useState(false)

  const updateUserData =async()=>{
    try {
      setallFields(false)
    } catch (error) {
      console.log("Server Error: ",error);
      
    }
  }

  return (
    <>
      <div className="w-full mt-3">
        <h1 className='text-2xl font-semibold mb-4'>My profile</h1>
        <div className="bg-white px-10 py-10 pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3">
            <div className="name">
              <h2 className='text-sm mb-1'>Full Name</h2>
              <p className={`${allFields?"hidden":"block"}`}>M Tayyeb</p>
              <div className={`relative ${allFields?"block":"hidden"}`}>
                <input type="text" placeholder='Enter your full name' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
                <i className='fa-solid fa-close absolute right-2 top-2 hover:text-blue-500 cursor-pointer'></i>
              </div>
            </div>
            <div className="email">
              <div className="flex items-center gap-1 text-sm mb-1">
                <h2>Email Address</h2>
                <p>|</p>
                <Link to="/" className="mt-1 text-sm text-blue-500 hover:underline">
                  Add
                </Link>
              </div>
              <p>@</p>
            </div>
            <div className="mobile">
              <div className="flex items-center gap-1 text-sm mb-1">
                <h2>Mobile</h2>
                <p>|</p>
                <Link to="/" className="mt-1 text-sm text-blue-500 hover:underline">
                  Change
                </Link>
              </div>
              <p>+92 338274794834</p>
              <div className="flex gap-2 text-sm mt-1 items-center">
                <input type="checkbox" id="notifications" />
                <label htmlFor="notifications">
                  <p className='cursor-pointer'>Receive marketing SMS</p>
                </label>
              </div>
            </div>
            <div className="birthday">
              <h2 className='text-sm mb-1'>Birthday</h2>
              <p className={`${allFields?"hidden":"block"}`}>14-1-4548</p>
              <div className={`relative ${allFields?"block":"hidden"}`}>
                <input type="date" placeholder='Enter your full name' className='outline-none pe-7 w-full border-site-color border text-black py-1 px-2' />
              </div>
            </div>
            <div className="gender">
              <h2 className='text-sm mb-1'>Gender</h2>
              <p className={`${allFields?"hidden":"block"}`}>Male</p>
              <div className="relative">
                <select className={`bg-gray-50 border border-site-color text-gray-900 ${allFields?"block":"hidden"} outline-none text-sm focus:ring-blue-500 focus:border-blue-500 pe-5 py-2 px-2`}>
                  <option selected>Select Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="btn mt-14 flex flex-col">
            {allFields?<>
              <button className='py-3 uppercase w-[300px] bg-site-color text-white font-semibold' onClick={updateUserData}>Save Changes</button>
            </>:<><button className='py-3 uppercase w-[300px] bg-[rgb(26,156,183)] text-white font-semibold' onClick={()=>setallFields(true)}>EDIT PROFILE</button>
            <button className='py-3 uppercase mt-5 w-[300px] bg-[rgb(26,156,183)] text-white font-semibold'>CHANGE PASSWORD</button></>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile