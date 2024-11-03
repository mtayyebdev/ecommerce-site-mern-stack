import React, { useState } from 'react'

function Contacts() {
  const [preview, setpreview] = useState(false)
  return (
    <div className="w-full">
      <div>
        <h2 className='text-xl font-semibold'>All Contacts</h2>
        <div className=' w-[10rem] h-0.5 mt-1 bg-blue-600'></div>
      </div>

      <div className={`relative overflow-x-auto ${preview ? "hidden" : "block"
        } mt-4`}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3" >
                Preview
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                M Tayyeb
              </th>
              <td scope="row" className="px-6 py-4 whitespace-nowrap">
                tayyabkhankqw87823@gmail.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                +92 32498234234
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                hi there is nice store
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => setpreview(true)}></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                M Tayyeb
              </th>
              <td scope="row" className="px-6 py-4 whitespace-nowrap">
                tayyabkhankqw87823@gmail.com
              </td>
              <td className="px-6 py-4">
                +92 32498234234
              </td>
              <td className="px-6 py-4">
                hi there is nice store
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                M Tayyeb
              </th>
              <td scope="row" className="px-6 py-4 whitespace-nowrap">
                tayyabkhankqw87823@gmail.com
              </td>
              <td className="px-6 py-4">
                +92 32498234234
              </td>
              <td className="px-6 py-4">
                hi there is nice store
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                M Tayyeb
              </th>
              <td scope="row" className="px-6 py-4 whitespace-nowrap">
                tayyabkhankqw87823@gmail.com
              </td>
              <td className="px-6 py-4">
                +92 32498234234
              </td>
              <td className="px-6 py-4">
                hi there is nice store
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                M Tayyeb
              </th>
              <td scope="row" className="px-6 py-4 whitespace-nowrap">
                tayyabkhankqw87823@gmail.com
              </td>
              <td className="px-6 py-4">
                +92 32498234234
              </td>
              <td className="px-6 py-4">
                hi there is nice store
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-eye text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt text-blue-500 hover:text-blue-600 cursor-pointer'></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={`w-full absolute ${preview ? "flex" : "hidden"} items-center justify-center h-[135vh] md:h-screen top-0 left-0 z-999999 bg-white/25 backdrop-blur-sm overflow-hidden`}>
        <i className='fa-solid fa-close text-xl absolute top-7 right-8 text-black hover:text-primary cursor-pointer' onClick={() => setpreview(false)}></i>
        <div className="w-5/6">
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="name">
              <h3 className='text-gray-600  text-lg font-semibold'>Name</h3>
              <p className='text-base'>M Tayyeb</p>
            </div>
            <div className="phone">
              <h3 className='text-gray-600 font-semibold text-lg'>Phone</h3>
              <p className='text-base'>+92 3284489324832</p>
            </div>
            <div className="email">
              <h3 className='text-gray-600 font-semibold text-lg'>Email</h3>
              <p className='text-base'>tayyabkhankqw878@gmail.com</p>
            </div>
          </div>
          <div className="message mt-5">
            <h3 className='text-gray-600 text-lg font-semibold'>Message</h3>
            <p className='text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque earum eligendi, expedita veritatis ipsum aut quas alias deleniti aperiam, excepturi pariatur officiis velit! Rem aspernatur obcaecati fugit architecto vero nesciunt.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts