import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { UpdateProduct } from '../store/slices/adminSlices/UpdateProductSlice.jsx'
import { GetSingleProduct } from '../store/slices/adminSlices/GetSingleProductSlice.jsx'

function Update_products() {
  const { id } = useParams();
  const dispatch = useDispatch()

  const [loader, setloader] = useState(false)
  const [images, setimages] = useState([])
  const [name, setName] = useState("");
  const [longDescription, setlongDescription] = useState("")
  const [shortDescription, setshortDescription] = useState("")
  const [price, setprice] = useState(0)
  const [discount_price, setdiscount_price] = useState(0)
  const [delivery_price, setdelivery_price] = useState(0)
  const [stock, setStock] = useState(0)
  const [returnProduct, setreturnProduct] = useState("")
  const [warranty, setwarranty] = useState("")
  const [category, setcategory] = useState("")
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const getproduct = async (id) => {
    await dispatch(GetSingleProduct(id))
      .then((res) => {
        if (res.type === "getsingleproduct/fulfilled") {
          setName(res.payload.data.name);
          setdelivery_price(res.payload.data.deliveryPrice);
          setdiscount_price(res.payload.data.discountPrice);
          setlongDescription(res.payload.data.longDescription);
          setshortDescription(res.payload.data.shortDescription);
          setprice(res.payload.data.price);
          setStock(res.payload.data.stock)
          setSelectedColors([...res.payload.data.color])
          setSelectedSizes([...res.payload.data.size])
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getproduct(id)
  }, [id]);

  const updateProduct = async () => {
    try {
      setloader(true)
      const formData = new FormData()
      formData.append("name", name)
      formData.append("longDescription", longDescription)
      formData.append("shortDescription", shortDescription)
      formData.append("price", price)
      formData.append("discountPrice", discount_price)
      formData.append("deliveryPrice", delivery_price)
      formData.append("color", [...selectedColors])
      formData.append("size", [...selectedSizes])
      formData.append("stock", stock)
      formData.append("returns", returnProduct)
      formData.append("warranty", warranty)
      formData.append("category", category)
      images.forEach((img) => {
        formData.append("images", img)
      })
      const data = {
        formData,
        id
      }

      await dispatch(UpdateProduct(data))
    } catch (error) {
      console.log("Product updating failed ", error);
    }
    setloader(false)
  }

  const imageUploadHandler = (e) => {
    if (images.length > 3) {
      return toast.error("Only 4 images are allowed...")
    } else {
      const files = Array.from(e.target.files)
      setimages((prev) => [...prev, ...files])
    }
  }

  // Array of available colors
  const colors = [
    "blue",
    "red",
    "black",
    "white",
    "yellow",
    "orange",
    "none"
  ];

  const sizes = [
    "SM",
    "MD",
    "LG",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "none"
  ]

  // Function to handle checkbox change
  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Function to handle checkbox change
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div className="w-full">
      <div>
        <h2 className='text-xl font-semibold'>Update Products</h2>
        <div className=' w-[10rem] h-0.5 mt-1 bg-blue-600'></div>
      </div>
      <div className="space-y-6 mt-5">
        <div className="img py-4">
          <label htmlFor="fimg">
            <div className="otherimgs h-[160px] flex flex-row space-x-3 flex-wrap items-center">
              {
                images.map((img, i) => (
                  <div className="img" key={i}>
                    <img src={img.name ? URL.createObjectURL(img) : img} alt="images" className="w-[80px] h-[80px] md:w-[150px] md:h-[150px]" />
                  </div>
                ))
              }
            </div>
          </label>
          <input type="file" className="hidden" multiple name="fimg" onChange={imageUploadHandler} id="fimg" />
        </div>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">
            Product Name
          </label>
          <textarea
            name="name"
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
            <label className="text-gray-800 text-sm mb-2 block">Color</label>
            <div className="flex flex-col space-y-2">
              {colors.map((color, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-800">{color}</span>
                </label>
              ))}
            </div>
            {/* Display selected colors */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Selected Colors: {selectedColors.length > 0 ? selectedColors.join(", ") : "None"}
              </p>
            </div>
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Size</label>
            <div className="flex flex-col space-y-2">
              {sizes.map((size, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-800">{size}</span>
                </label>
              ))}
            </div>
            {/* Display selected colors */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Selected Sizes: {selectedSizes.length > 0 ? selectedSizes.join(", ") : "None"}
              </p>
            </div>
          </div>
          <div className="stock">
            <label htmlFor="stock" className="text-gray-800 text-sm mb-2 block">
              Total Stock
            </label>
            <div className="relative flex items-center">
              <input
                name="stock"
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                className=" bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                placeholder="Enter Total Stock"
              />
            </div>
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
          onClick={updateProduct}
          type="submit"
          className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none"
        >
          {loader ? "Updating...." : "Update Product"}
        </button>
      </div>
    </div>
  )
}

export default Update_products