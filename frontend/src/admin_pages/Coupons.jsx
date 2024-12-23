import React from 'react'

function Coupons() {
  return (
    <div className="w-full">
        <div className="w-full">
          <h2 className='text-xl font-semibold'>All Coupons</h2>
          <div className=' w-[9rem] h-0.5 mt-1 bg-blue-600'></div>
        </div>

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
                  Expire In
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
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  how 
                  mtayyeb
                </td>
          
                <td scope="row" className="px-6 py-4">
                  taysa7rwre
                </td>
                <td className="px-6 py-4">
                  5 days
                </td>
                <td className="px-6 py-4">
                  <i className='fa-solid fa-edit'></i>
                </td>
                <td className="px-6 py-4">
                  <i className='fa-solid fa-trash-alt'></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

  )
}

export default Coupons

