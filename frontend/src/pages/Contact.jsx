import React, { useState } from 'react';
import { CreateContact } from '../store/slices/contactSlices/CreateContactSlice.jsx'
import { useDispatch } from 'react-redux'

function Contact() {
  const dispatch = useDispatch()
  const [loader, setloader] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    reason: '',
    message: '',
    image: null
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true)
    const allData = new FormData();
    allData.append("name", formData.name);
    allData.append("email", formData.email);
    allData.append("message", formData.message);
    allData.append("orderNumber", formData.orderNumber);
    allData.append("image", formData.image);
    allData.append("reason", formData.reason);

    await dispatch(CreateContact(allData))
      .then((res) => {
        if (res.type === "createcontact/fulfilled") {
          setStatus('Thank you! We’ll get back to you soon.');
          setFormData({
            name: '',
            email: '',
            orderNumber: '',
            reason: '',
            message: '',
            image: null
          });
        }
      })
      .catch((err) => {
        console.log("Message sending error: ", err);
      })
    setloader(false)

    setTimeout(() => setStatus(''), 3000);
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Get in Touch
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Have a question? Fill out the form below!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Your Name"
                />
              </div>

              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Email Address"
                />
              </div>

              <div className="relative">
                <i className="fa-solid fa-hashtag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  id="orderNumber"
                  name="orderNumber"
                  type="text"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Order Number (optional)"
                />
              </div>

              <div className="relative">
                <i className="fa-solid fa-question absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <select
                  id="reason"
                  name="reason"
                  required
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 bg-white appearance-none"
                >
                  <option selected value="" >Select a reason</option>
                  <option value="order-status">Order Status</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="relative">
                <i className="fa-solid fa-comment absolute left-3 top-4 text-gray-400"></i>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Your Message"
                />
              </div>

              <div className="relative">
                <i className="fa-solid fa-paperclip absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept='.jpg, .png, .jpeg, .webp, .svg'
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                {loader ? "Loading...." : "Send Message"}
              </button>

              {status && (
                <p className="text-center text-sm text-green-600">{status}</p>
              )}
            </form>
          </div>

          {/* Right Side: Store Info */}
          <div className="w-full md:w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Store Information</h3>
              <p className="text-sm mb-6">
                We’re here to assist you with all your shopping needs. Reach out anytime, and our team will respond promptly to ensure your experience with us is exceptional!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <i className="fa-solid fa-phone mr-3 text-indigo-200"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-envelope mr-3 text-indigo-200"></i>
                <span>support@yourstore.com</span>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-map-marker-alt mr-3 text-indigo-200"></i>
                <span>123 Shopping St, E-Commerce City</span>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-clock mr-3 text-indigo-200"></i>
                <span>Mon-Fri: 9 AM - 6 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact