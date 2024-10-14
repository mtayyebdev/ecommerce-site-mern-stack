import React, { useState } from "react";
import { Product } from '../components/index.js'
import { Link } from "react-router-dom";

function Shop() {
  const [navbarleft, setnavbarleft] = useState(false)

  const products = [
    {
      id: 1,
      image: "/sliderimg/p1.webp",
      name: "Airpods_Pro Wireless Earbuds Bluetooth 5.0",
      price: 200,
      discount: 500,
    },
    {
      id: 2,
      image: "/sliderimg/p2.webp",
      name: "Samsung Galaxy Watch 4 - Smartwatch",
      price: 250,
      discount: 300,
    },
    {
      id: 3,
      image: "/sliderimg/p3.webp",
      name: "Sony WH-1000XM4 Noise Cancelling Headphones",
      price: 350,
      discount: 400,
    },
    {
      id: 4,
      image: "/sliderimg/p4.webp",
      name: "Apple iPhone 14 Pro - 256GB",
      price: 1200,
      discount: 1500,
    },
    {
      id: 5,
      image: "/sliderimg/p5.webp",
      name: "Bose SoundLink Revolve+ Bluetooth Speaker",
      price: 150,
      discount: 250,
    },
    {
      id: 6,
      image: "/sliderimg/p6.webp",
      name: "Logitech MX Master 3 Wireless Mouse",
      price: 100,
      discount: 180,
    },
  ];

  return (
    <>
      <div className="w-full py-3">
        <div className="bg-white">
          <div className="py-3 px-3">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-blue-400"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-black mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-black md:ms-2">
                      Search Results
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <hr />
          <div className="flex w-full mt-5 py-3 px-3 relative">
            <div className="absolute -top-3 border border-gray-400 rounded-md px-2 py-[2px] bg-orange-500 text-white hover:bg-site-color gap-2 left-2 flex md:hidden items-center" onClick={()=>setnavbarleft(true)}>
              <i className="fa-solid fa-bars text-lg"></i>
              <h3 className="text-sm font-semibold">Show Filters</h3>
            </div>
            <div className={`left shadow md:shadow-none h-full md:h-auto transition-all w-[250px] -top-5 left-0 py-2 px-2 md:py-0 md:px-0 rounded md:rounded-none md:w-[25%] absolute ${navbarleft?"translate-x-0":"-translate-x-[200%]"} bg-white md:static md:translate-x-0`}>
              <div className=" relative block md:hidden">
                <i className="fa-solid fa-close absolute right-2 top-0 hover:text-blue-500 text-lg" onClick={()=>setnavbarleft(false)}></i>
              </div>
              <div className="price mb-[23px]">
                <h2 className="text-lg font-semibold">Price</h2>
                <div className="flex items-center flex-wrap gap-1">
                  <input type="number" placeholder="Min" className="w-[70px] outline-none border-gray-400 rounded py-1 px-1 border text-sm" />
                  <p>-</p>
                  <input type="number" placeholder="Max" className="w-[70px] outline-none border-gray-400 rounded py-1 px-1 border text-sm" />
                  <button className="py-[1px] px-2 rounded text-white hover:bg-site-color bg-orange-500"><i className="fa-solid fa-caret-right text-xl"></i></button>
                </div>
              </div>
              <hr />
              <div className="color my-4">
                <h2 className="text-lg font-semibold">Color Family</h2>
                <div className="flex flex-col">
                  <div className="flex items-center me-4">
                    <input id="red-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2" />
                    <label htmlFor="red-radio" className="ms-2 text-sm font-medium text-gray-900">Red</label>
                  </div>
                  <div className="flex items-center me-4">
                    <input id="green-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-full focus:ring-green-500 focus:ring-2" />
                    <label htmlFor="green-radio" className="ms-2 text-sm font-medium text-gray-900">Green</label>
                  </div>
                  <div className="flex items-center me-4">
                    <input id="purple-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 focus:ring-2" />
                    <label htmlFor="purple-radio" className="ms-2 text-sm font-medium text-gray-900">Purple</label>
                  </div>
                  <div className="flex items-center me-4">
                    <input id="teal-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2" />
                    <label htmlFor="teal-radio" className="ms-2 text-sm font-medium text-gray-900">Teal</label>
                  </div>
                  <div className="flex items-center me-4">
                    <input id="yellow-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 focus:ring-2" />
                    <label htmlFor="yellow-radio" className="ms-2 text-sm font-medium text-gray-900">Yellow</label>
                  </div>
                  <div className="flex items-center me-4">
                    <input id="orange-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2" />
                    <label htmlFor="orange-radio" className="ms-2 text-sm font-medium text-gray-900">Orange</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="right w-full md:w-[75%] mt-3 md:mt-0">
              <div className="top">
                <h2 className="text-xl font-semibold">wooden comb</h2>
                <div className="flex items-center flex-wrap justify-between gap-2 mb-4">
                  <p className="text-sm">2398 items found for "wooden comb"</p>
                  <div>
                    <select id="filter" className="py-1.5 px-2 pe-3 outline-none rounded-lg border border-gray-400">
                      <option value="match">Best Match</option>
                      <option value="low">Price low to high</option>
                      <option value="high">Price high to low</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex flex-wrap items-center justify-center gap-3 ms-2 mt-5">
                {
                  products.map((data, i) => {
                    return (
                      <Product key={i} image={data.image} discount={data.discount} name={data.name} price={data.price} id={data.id} />
                    )
                  })
                }
              </div>
              <div className="mt-5 mb-2 flex items-center justify-end">
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                      <a href="#" className="flex items-center justify-center px-2 sm:px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-2 sm:px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-2 sm:px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                    </li>
                    <li>
                      <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-2 sm:px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-2 sm:px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-2 sm:px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-2 sm:px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
