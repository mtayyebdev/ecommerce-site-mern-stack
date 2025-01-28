import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetSingleInfo } from '../store/slices/userSlices/GetSingleUserInfo.jsx'

const AddressForm = ({ setaddressForm, setFormData, formTitle, formData, handleSubmit, formId, setformId }) => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddressTypeChange = (type) => {
        setFormData({
            ...formData,
            addressType: type
        });
    };

    const handleCancel = () => {
        setFormData({
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
        setaddressForm(false);
        setformId(null);
    };

    const getsingleinfoHandler = async () => {
        await dispatch(GetSingleInfo(formId))
            .then((res) => {
                if (res.type === 'getsingleinfo/fulfilled') {
                    setFormData({
                        name: res.payload.data.name,
                        address: res.payload.data.address,
                        city: res.payload.data.city,
                        province: res.payload.data.province,
                        country: res.payload.data.country,
                        zone: res.payload.data.zone,
                        landmark: res.payload.data.landmark,
                        phoneNumber: res.payload.data.phone,
                        addressType: res.payload.data.addressType
                    })
                }
            })
    }

    useEffect(() => {
        if (formId) {
            getsingleinfoHandler()
        }
    }, [])

    return (
        <div className="full_form">
            <h2 className='text-2xl font-semibold mb-4 mt-4 lg:mt-0'>{formTitle}</h2>
            <div className="w-full mx-auto p-6 bg-white space-y-6">
                {/* Full Name and Province */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Full Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="First Last"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}

                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="Please enter your phone number"
                        />
                    </div>

                </div>

                {/* Phone Number and City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Country:</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="Please enter your country"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Province / Region:</label>
                        <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="Please enter your province or region"
                        />
                    </div>

                </div>

                {/* Landmark and Zone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="Please enter your city"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Zone:</label>
                        <input
                            type="text"
                            name="zone"
                            value={formData.zone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="Please enter your zone"
                        />
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Landmark (Optional):</label>
                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="E.g., beside train station"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}

                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            placeholder="Please enter your address"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='hidden md:block'></div>
                    {/* Address Type Buttons */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Select a label for effective delivery:</label>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => handleAddressTypeChange("Office")}
                                className={`px-4 sm:px-6 py-1 sm:py-2 border rounded-md ${formData.addressType === "Office"
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-gray-100 text-gray-700 border-blue-500"
                                    }`}
                            >
                                Office
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddressTypeChange("Home")}
                                className={`px-4 sm:px-6 py-1 sm:py-2 border rounded-md ${formData.addressType === "Home"
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-gray-100 text-gray-700 border-red-500"
                                    }`}
                            >
                                Home
                            </button>
                        </div>
                    </div>
                </div>
                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end space-x-4 pt-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-5 sm:px-10 py-1 sm:py-2 bg-[rgb(239,240,245)] text-gray-800 border border-gray-300 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={() => handleSubmit(formId !== null ? "edit" : "new")}
                        className="px-5 sm:px-10 py-1 sm:py-2 bg-site-color text-white hover:bg-orange-700"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

    );
};


export default AddressForm;