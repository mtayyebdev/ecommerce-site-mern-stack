import React from 'react'

function Reviews() {
  return (
    <div className="w-full mt-3">
      <h2 className='text-2xl font-semibold mb-4'>My Reviews</h2>
      <div className='bg-white p-5 flex items-center justify-center w-full h-[400px]'>
        <div className="flex flex-col items-center justify-center">
          <i className='fa-solid fa-eye-slash text-4xl mb-2'></i>
        <h2 className='text-lg font-semibold text-gray-500'>You don’t have any purchases to review</h2>
        </div>
      </div>
    </div>
  )
}

export default Reviews