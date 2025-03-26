import React, { useState } from 'react'
import { GetContacts } from '../store/slices/adminSlices/GetContactSlice.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteContact } from '../store/slices/adminSlices/DeleteContactSlice.jsx'

function Contacts() {
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state.getcontacts)
  const [preview, setpreview] = useState(false)
  const [singleContact, setsingleContact] = useState(null)

  const ReverseContacts = contacts && [...contacts.data].reverse();

  const deleteContact = async (id) => {
    await dispatch(DeleteContact(id))
      .then((res) => {
        console.log(res.type);
        
        if (res.type === "deletecontact/fulfilled") {
          dispatch(GetContacts())
        }
      })
      .catch((err) => {
        console.log("contact deleting error: ", err);
      })
  }

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
                Reason
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
            {
              ReverseContacts && ReverseContacts.map((contact, i) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={i}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {contact.name}
                  </th>
                  <td scope="row" className="px-6 py-4 whitespace-nowrap">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.message.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4">
                    <i className='fa-solid fa-eye text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => { setpreview(true); setsingleContact(contact) }}></i>
                  </td>
                  <td className="px-6 py-4">
                    <i className='fa-solid fa-trash-alt text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => deleteContact(contact._id)}></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className={`w-full absolute ${preview ? "flex" : "hidden"} items-center justify-center h-[135vh] md:h-screen top-0 left-0 z-999999 bg-white/25 backdrop-blur-sm overflow-hidden`}>
        <i className='fa-solid fa-close text-xl absolute top-7 right-8 text-black hover:text-primary cursor-pointer' onClick={() => setpreview(false)}></i>
        <div className="w-5/6">
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="name">
              <h3 className='text-gray-600  text-lg font-semibold'>Name</h3>
              <p className='text-base'>{singleContact&&singleContact.name}</p>
            </div>
            <div className="email">
              <h3 className='text-gray-600 font-semibold text-lg'>Email</h3>
              <p className='text-base'>{singleContact&&singleContact.email}</p>
            </div>
            <div className="phone">
              <h3 className='text-gray-600 font-semibold text-lg'>Reason</h3>
              <p className='text-base'>{singleContact&&singleContact.reason}</p>
            </div>
            <div className="orderNumber">
              <h3 className='text-gray-600 font-semibold text-lg'>Order Number</h3>
              <p className='text-base'>{singleContact&&singleContact.orderNumber ? singleContact.orderNumber : "No Order Id Found."}</p>
            </div>
          </div>
          <div className="message mt-5">
            <h3 className='text-gray-600 text-lg font-semibold'>Message</h3>
            <p className='text-base'>{singleContact&&singleContact.message}</p>
          </div>
          <div className="image mt-5">
            <h3 className='text-gray-600 text-lg font-semibold'>File</h3>
            {singleContact&&singleContact.image ? <img src={singleContact.image} className='w-[200px]' /> : "No File Found."}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts