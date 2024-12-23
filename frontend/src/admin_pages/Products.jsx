import React from 'react'

function Products() {
  return (
    <div className="w-full">
      <div className="w-full">
        <h2 className='text-xl font-semibold'>All Users</h2>
        <div className=' w-[7rem] h-0.5 mt-1 bg-blue-600'></div>
      </div>

      <div className="filters">
        <div className="box max-w-md mb-4 mt-4">
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block outline-none w-full py-3 px-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Products name..." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5">Search</button>
          </div>
        </div>
        <div className="selecters max-w-4xl flex-wrap flex items-center justify-between gap-3">
          <div className="min-w-[200px]">
            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Select Category</label>
            <select id="countries" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>Choose Category</option>
              <option value="US">Shose</option>
              <option value="CA">Cloths</option>
              <option value="FR">Caps</option>
              <option value="DE">Chappal</option>
            </select>
          </div>
          <div className="min-w-[200px]">
            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Select Price</label>
            <select id="countries" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>Choose Price</option>
              <option value="US">Max $20</option>
              <option value="CA">$20 - $60</option>
              <option value="FR">$60 - $110</option>
              <option value="DE">$110 - $200</option>
              <option value="DE">$200 - $400</option>
              <option value="DE">Min $400</option>
            </select>
          </div>
          <div className="min-w-[200px]">
            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Select Color</label>
            <select id="countries" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>Choose a Color</option>
              <option value="US">Green</option>
              <option value="CA">Blue</option>
              <option value="FR">Red</option>
              <option value="DE">Yallow</option>
              <option value="DE">White</option>
              <option value="DE">Black</option>
              <option value="DE">Purpal</option>
              <option value="DE">Orange</option>
              <option value="DE">Selver</option>
              <option value="DE">Golden</option>
            </select>
          </div>
          <div className="min-w-[200px]">
            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Select Ratings</label>
            <select id="countries" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>Choose a Ratings</option>
              <option value="US">Max 5</option>
              <option value="CA">5 - 50</option>
              <option value="FR">50 - 150</option>
              <option value="DE">150 - 300</option>
              <option value="DE">300 - 600</option>
              <option value="DE">600 - 1500</option>
              <option value="DE">Min 1500</option>
            </select>
          </div>

        </div>
      </div>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Reviews
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
                <img src="/sliderimg/p3.webp" className='w-[40px] h-[40px] rounded' alt="product" />
              </td>
              <td className="px-6 py-4">
                Habib shose water profe and shine shose with any color and any size
              </td>
              <td scope="row" className="px-6 py-4">
                Shose
              </td>
              <td className="px-6 py-4">
                $43534
              </td>
              <td className="px-6 py-4">
                Red
              </td>
              <td className="px-6 py-4">
                5.5
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-edit'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <img src="/sliderimg/p3.webp" className='w-[40px] h-[40px] rounded' alt="product" />
              </td>
              <td className="px-6 py-4">
                Habib shose water profe and shine shose with any color and any size
              </td>
              <td scope="row" className="px-6 py-4">
                Shose
              </td>
              <td className="px-6 py-4">
                $43534
              </td>
              <td className="px-6 py-4">
                Red
              </td>
              <td className="px-6 py-4">
                5.5
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-edit'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <img src="/sliderimg/p3.webp" className='w-[40px] h-[40px] rounded' alt="product" />
              </td>
              <td className="px-6 py-4">
                Habib shose water profe and shine shose with any color and any size
              </td>
              <td scope="row" className="px-6 py-4">
                Shose
              </td>
              <td className="px-6 py-4">
                $43534
              </td>
              <td className="px-6 py-4">
                Red
              </td>
              <td className="px-6 py-4">
                5.5
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-edit'></i>
              </td>
              <td className="px-6 py-4">
                <i className='fa-solid fa-trash-alt'></i>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <img src="/sliderimg/p3.webp" className='w-[40px] h-[40px] rounded' alt="product" />
              </td>
              <td className="px-6 py-4">
                Habib shose water profe and shine shose with any color and any size
              </td>
              <td scope="row" className="px-6 py-4">
                Shose
              </td>
              <td className="px-6 py-4">
                $43534
              </td>
              <td className="px-6 py-4">
                Red
              </td>
              <td className="px-6 py-4">
                5.5
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

export default Products