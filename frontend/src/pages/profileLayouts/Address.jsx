import React from 'react'

function Address() {
  return (
    <>
      <div className=" w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-semibold mb-2 sm:mb-0">Address Book</h1>
          <div className="space-x-4 text-sm text-blue-600">
            <a href="#" className="hover:underline">Make default shipping address</a>
            <span>|</span>
            <a href="#" className="hover:underline">Make default billing address</a>
          </div>
        </div>

        <div className="bg-white w-full p-7">
          <div className="overflow-x-auto">
            <table className=" w-full">
              <thead className="bg-gray-50">
                <tr className='border-b'>
                  <th className="px-4 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postcode</th>
                  <th className="px-4 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className='border-b'>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">
                    Muhammad Tayyeb
                  </td>
                  <td className="px-4 py-3 text-black">
                    <div className="flex text-xs">
                      <button className='h-[18px] mr-2 rounded-full text-xs px-1.5 bg-orange-500 text-white'>Home</button>
                      <p>kalu Khan khat kali</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">Khyber Pakhtunkhwa - Swabi - Kalu Khan</td>
                  <td className="px-4 py-3 whitespace-nowrap">3368212215</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="">
                      <p>Default Shipping Address</p>
                      <p>Default Billing Address</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900">EDIT</a>
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold">Muhammad Tayyeb</td>
                  <td className="px-4 py-3">kalu khan, swabi</td>
                  <td className="px-4 py-3">Khyber Pakhtunkhwa - Swabi - Kalu Khan</td>
                  <td className="px-4 py-3 whitespace-nowrap">3368212215</td>
                  <td className="px-4 py-3 whitespace-nowrap"></td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900">EDIT</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex items-center justify-end">
            <button className="bg-[rgb(26,156,183)] text-sm hover:bg-[rgb(58,208,238)] font-semibold text-white py-2.5 px-6">
              + ADD NEW ADDRESS
            </button>
          </div>
        </div>


      </div>


    </>
  )
}

export default Address