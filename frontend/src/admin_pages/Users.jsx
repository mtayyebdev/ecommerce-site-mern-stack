import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteUser } from '../store/slices/adminSlices/DeleteUserSlice.jsx'
import { GetUsers } from '../store/slices/adminSlices/GetUsersSlice.jsx'
import { Link } from 'react-router-dom'

function Users() {
  const { users } = useSelector((state) => state.getadminusers)
  const [allUsers, setallUsers] = useState();
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = () => {
    const filterUsers = users && users.data.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setallUsers(filterUsers)
  }

  useEffect(() => {
    setallUsers(users && [...users.data].reverse())
  }, [users])

  const deleteUser = async (id) => {
    await dispatch(DeleteUser(id))
      .then((res) => {
        if(res.type === "deleteuser/fulfilled"){
          dispatch(GetUsers())
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <h2 className='text-xl font-semibold'>All Users</h2>
          <div className=' w-[7rem] h-0.5 mt-1 bg-blue-600'></div>
        </div>

        <div className="box max-w-md mt-4">
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} id="default-search" className="block outline-none w-full py-3 px-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for Username..." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5" onClick={searchHandler}>Search</button>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Admin
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
                allUsers && allUsers.map((user, i) => (
                  <tr className="bg-white border-b hover:bg-gray-50" key={i}>
                    <td className="px-6 py-4">
                      {user.name}
                    </td>
                    <td scope="row" className="px-6 py-4">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4">
                      {user.gender}
                    </td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? "True" : "False"}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/web-admin/update-user/${user._id}`}><i className='fa-solid fa-edit cursor-pointer hover:text-site-color'></i></Link>
                    </td>
                    <td className="px-6 py-4">
                      <i className='fa-solid fa-trash-alt cursor-pointer hover:text-site-color' onClick={() => deleteUser(user._id)}></i>
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

export default Users