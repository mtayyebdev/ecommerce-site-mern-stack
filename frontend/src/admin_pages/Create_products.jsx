import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function Create_products() {
  const [loader, setloader] = useState(false)
  const [name, setName] = useState("");
  const [longDescription, setlongDescription] = useState("")
  const [shortDescription, setshortDescription] = useState("")
  const [frontimg, setFrontimg] = useState(null)
  const [img1, setImg1] = useState(null)
  const [img2, setImg2] = useState(null)
  const [price, setprice] = useState(0)
  const [discount_price, setdiscount_price] = useState(0)
  const [delivery_price, setdelivery_price] = useState(0)
  const [img3, setImg3] = useState(null)
  const [color, setcolor] = useState("")
  const [size, setsize] = useState("")
  const [returnProduct, setreturnProduct] = useState(false)
  const [warranty, setwarranty] = useState(false)
  const [category, setcategory] = useState("none")

  const createProduct = async() => {
    try {
      setloader(true)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("longDescription", longDescription);
      formData.append("shortDescription", shortDescription);
      formData.append("frontimg", frontimg);
      formData.append("img1", img1);
      formData.append("img2", img2);
      formData.append("price", price);
      formData.append("discount_price", discount_price);
      formData.append("delivery_price", delivery_price);
      formData.append("img3", img3);
      formData.append("color", color);
      formData.append("size", size);
      formData.append("returnProduct", returnProduct);
      formData.append("warranty", warranty);
      formData.append("category", category);

      console.log(formData);

    } catch (error) {
      console.log("Product creation error ", error);

    }
    setloader(false);
  }

  return (
    <>
      <div className="w-full">
        <div>
          <h2 className='text-xl font-semibold'>Create Products</h2>
          <div className=' w-[12rem] h-0.5 mt-1 bg-blue-600'></div>
        </div>
        <div className="space-y-6 mt-5">
          <div className="img py-4">
            <div className="otherimgs flex flex-row gap-3 flex-wrap items-center justify-between">
              <div className="frontimg">
                <label htmlFor="fimg">
                  <h2 className="mb-1 font-semibold text-lg">Front Image</h2>
                  <img src={frontimg ? URL.createObjectURL(frontimg) : "/sliderimg/p5.webp"} alt="fimg" className="w-[150px] h-[150px]" />
                </label>
                <input type="file" className="hidden" name="fimg" onChange={(e) => setFrontimg(e.target.files[0])} id="fimg" />
              </div>
              <div className="img1">
                <label htmlFor="img1">
                  <h2 className="mb-1 font-semibold text-lg">Image 1</h2>
                  <img src={img1 ? URL.createObjectURL(img1) : "/sliderimg/p4.webp"} alt="fimg" className="w-[150px] h-[150px]" />
                </label>
                <input type="file" className="hidden" name="img1" id="img1" onChange={(e) => setImg1(e.target.files[0])} />
              </div>
              <div className="img2">
                <label htmlFor="img2">
                  <h2 className="mb-1 font-semibold text-lg">Image 2</h2>
                  <img src={img2 ? URL.createObjectURL(img2) : "/sliderimg/p4.webp"} alt="fimg" className="w-[150px] h-[150px]" />
                </label>
                <input type="file" className="hidden" name="img2" id="img2" onChange={(e) => setImg2(e.target.files[0])} />
              </div>
              <div className="img3">
                <label htmlFor="img3">
                  <h2 className="mb-1 font-semibold text-lg">Image 3</h2>
                  <img src={img3 ? URL.createObjectURL(img3) : "/sliderimg/p4.webp"} alt="fimg" className="w-[150px] h-[150px]" />
                </label>
                <input type="file" className="hidden" name="img3" id="img3" onChange={(e) => setImg3(e.target.files[0])} />
              </div>
            </div>
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              placeholder="Enter product name"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="price">
              <label htmlFor="price" className="text-gray-800 text-sm mb-2 block">
                Price
              </label>
              <div className="relative flex items-center">
                <input
                  name="price"
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  required
                  className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter price"
                />
                <span className="absolute right-4 text-gray-500">
                  ���
                </span>
              </div>
            </div>
            <div className="discount_price">
              <label htmlFor="discount_price" className="text-gray-800 text-sm mb-2 block">
                Discount Price
              </label>
              <div className="relative flex items-center">
                <input
                  name="discount_price"
                  type="number"
                  id="discount_price"
                  value={discount_price}
                  onChange={(e) => setdiscount_price(e.target.value)}
                  required
                  className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter discount price"
                />
                <span className="absolute right-4 text-gray-500">
                  ���
                </span>
              </div>
            </div>
            <div className="delivery_price">
              <label htmlFor="delivery_price" className="text-gray-800 text-sm mb-2 block">
                Delivery Price
              </label>
              <div className="relative flex items-center">
                <input
                  name="delivery_price"
                  type="number"
                  id="delivery_price"
                  value={delivery_price}
                  onChange={(e) => setdelivery_price(e.target.value)}
                  required
                  className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter delivery price"
                />
                <span className="absolute right-4 text-gray-500">
                  ���
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="warranty"
                className="text-gray-800 text-sm mb-2 block"
              >
                Warranty
              </label>
              <select
                name="warranty"
                onChange={(e) => setwarranty(e.target.value)}
                id="warranty"
                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              >
                <option className="text-black">Select......</option>
                <option value={false} className="text-black">False</option>
                <option value={true} className="text-black">True</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="return"
                className="text-gray-800 text-sm mb-2 block"
              >
                Return
              </label>
              <select
                name="return"
                onChange={(e) => setreturnProduct(e.target.value)}
                id="return"
                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              >
                <option className="text-black">Select......</option>
                <option value={true} className="text-black">True</option>
                <option value={false} className="text-black">False</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="category"
                className="text-gray-800 text-sm mb-2 block"
              >
                Category
              </label>
              <select
                name="category"
                onChange={(e) => setcategory(e.target.value)}
                id="category"
                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              >
                <option className="text-black">Select......</option>
                <option value="electronic" className="text-black">Electronic</option>
                <option value="wooden" className="text-black">Wooden</option>
                <option value="shoes" className="text-black">Shoes</option>
                <option value="cloths" className="text-black">Cloths</option>
              </select>
            </div>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="color"
                className="text-gray-800 text-sm mb-2 block"
              >
                Color
              </label>
              <select
                name="color"
                onChange={(e) => setcolor(e.target.value)}
                id="color"
                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              >
                <option className="text-black">Select......</option>
                <option value="blue" className="text-black">Blue</option>
                <option value="red" className="text-black">Red</option>
                <option value="black" className="text-black">Black</option>
                <option value="white" className="text-black">White</option>
                <option value="yellow" className="text-black">Yellow</option>
                <option value="orange" className="text-black">Orange</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="size"
                className="text-gray-800 text-sm mb-2 block"
              >
                Size
              </label>
              <select
                name="size"
                onChange={(e) => setsize(e.target.value)}
                id="size"
                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              >
                <option className="text-black">Select......</option>
                <option value="sm" className="text-black">SM</option>
                <option value="md" className="text-black">MD</option>
                <option value="lg" className="text-black">LG</option>
                <option value="xl" className="text-black">XL</option>
                <option value="2xl" className="text-black">2XL</option>
                <option value="3xl" className="text-black">3XL</option>
                <option value="4xl" className="text-black">4XL</option>
                <option value="5xl" className="text-black">5XL</option>
                <option value="6xl" className="text-black">6XL</option>
                <option value="7xl" className="text-black">7XL</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="shortdes" className="text-gray-800 text-sm mb-2 block">
              Short Description
            </label>
            <textarea name="shortdes" value={shortDescription}
              onChange={(e) => setshortDescription(e.target.value)}
              required
              className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              placeholder="Enter short description..." id="shortdes"></textarea>

          </div>
          <div>
            <label htmlFor="longdes" className="text-gray-800 text-sm mb-2 block">
              Long Description
            </label>
            <textarea name="longdes" value={longDescription}
              onChange={(e) => setlongDescription(e.target.value)}
              required
              className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              placeholder="Enter long description..." id="longdes"></textarea>

          </div>

        </div>
        <div className="!mt-12">
          <button
            onClick={createProduct}
            type="submit"
            className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none"
          >
            {loader ? "Creating...." : "Create Product"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Create_products