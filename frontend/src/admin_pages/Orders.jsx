import React,{useState} from 'react'

function Orders() {
  const [message, setmessage] = useState()
  return (
    <div className="w-full">
      <div className="w-full">
        <h2 className='text-xl font-semibold'>All Orders</h2>
        <div className=' w-[8rem] h-0.5 mt-1 bg-blue-600'></div>
      </div>

      <div className="box max-w-md mt-4">
        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block outline-none w-full py-3 px-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for Id..." required />
          <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5">Search</button>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Preview
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                #236479434293842893
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4">
                Delivered
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                #236479434293842893
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4">
                Delivered
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                #236479434293842893
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4">
                Delivered
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                #236479434293842893
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4">
                Delivered
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt cursor-pointer hover:text-blue-600 text-base'></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders