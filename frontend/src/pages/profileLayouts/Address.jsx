import React, { useState, useEffect } from 'react'
import AddressForm from '../../components/AddressForm';
import { CreateUserInfo } from '../../store/slices/userSlices/CreateUserInfoSlice.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserInfo } from '../../store/slices/userSlices/GetUserInfoSlice.jsx'
import { UpdateUserInfo } from '../../store/slices/userSlices/UpdateUserInfoSlice.jsx'
import { updateInfoShipping } from '../../store/slices/userSlices/UpdateInfoShippingSlice.jsx'


function Address() {
  const [addressForm, setaddressForm] = useState(false);
  const [formId, setformId] = useState(null)
  const [formTitle, setformTitle] = useState("")
  const [defaultOptionsIcon, setdefaultOptionsIcon] = useState(false)
  const { data } = useSelector((state) => state.getuserinfo)

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    country: '',
    zone: '',
    landmark: '',
    phoneNumber: '',
    addressType: 'Home',
  });

  useEffect(() => {
    dispatch(GetUserInfo());
  }, []);

  const handleSubmit = async (word) => {
    if (word === "new") {
      console.log('New Form Data Submitted:', formData);
      await dispatch(CreateUserInfo(formData))
        .then((res) => {
          if (res.type === 'createuserinfo/fulfilled') {
            setaddressForm(false);
            dispatch(GetUserInfo());
          }
        })
      setformId(null);
    } else if (word === "edit") {
      const data = {
        id: formId,
        data: formData
      }
      await dispatch(UpdateUserInfo(data))
        .then((res) => {
          if (res.type === 'updateuserinfo/fulfilled') {
            setaddressForm(false);
            dispatch(GetUserInfo());
          }
        })
      setformId(null);
    }
  };

  const editFormHandler = (id) => {
    setformId(id)
    setformTitle("Edit Address")
    setaddressForm(true)
  }

  const formShippingHandler = async (id) => {
    await dispatch(updateInfoShipping(id))
      .then((res) => {
        if (res.type === 'updateinfoshipping/fulfilled') {
          dispatch(GetUserInfo());
        }
      })

  }

  return (
    <>
      <div className={` w-full ${addressForm ? 'hidden' : 'block'}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-semibold mb-2 sm:mb-0">Address Book</h1>
          <div className="text-sm text-blue-600">
            <p onClick={() => setdefaultOptionsIcon(true)} className="hover:underline cursor-pointer">Make default shipping address & billing address</p>
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

                {
                  data && data.map((item, i) => (
                    <tr className='border-b' key={i}>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-black">
                        <div className="flex text-xs">
                          <button className={`h-[18px] mr-2 rounded-full text-xs px-1.5 ${item.addressType === 'Home' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>{item.addressType}</button>
                          <p>{item.address}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.country} - {item.province} - {item.city} - {item.zone}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.phone}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {defaultOptionsIcon ? <>
                          <input type="radio" name="defaultAddressIcon" onChange={() => { formShippingHandler(item._id); setdefaultOptionsIcon(false) }} />
                        </> : <>
                          {item.defaultAddress ?
                            <>
                              <p>Default Shipping Address</p>
                              <p>Default Billing Address</p>
                            </>
                            : ""}
                        </>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                        <p className="text-blue-600 hover:text-blue-900 cursor-pointer" onClick={() => editFormHandler(item._id)}>EDIT</p>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex items-center justify-end">
            <button className="bg-[rgb(26,156,183)] text-sm hover:bg-[rgb(58,208,238)] font-semibold text-white py-2.5 px-6" onClick={() => { setaddressForm(true); setformTitle("Create New Address") }}>
              + ADD NEW ADDRESS
            </button>
          </div>
        </div>
      </div>
      {addressForm && <AddressForm setaddressForm={setaddressForm} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} setformId={setformId} formTitle={formTitle} formId={formId} />}
    </>
  )
}

export default Address