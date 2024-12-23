import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Comment } from "../components/index.js";
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleProduct } from '../store/slices/productSlices/GetSingleProductSlice.jsx'
import { CreateCart } from '../store/slices/cartSlices/CreateCartSlice.jsx'
import {GetCart} from '../store/slices/cartSlices/GetCartSlice.jsx'

function SingleProduct() {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state.getsingleproduct)
  const { id } = useParams();
  const [quantity, setquantity] = useState(1);


  useEffect(() => {
    dispatch(GetSingleProduct(id))
  }, [id])

  const addToCartHandler = async() => {
    await dispatch(CreateCart({ quantity, id }))
    await dispatch(GetCart())
  }




  return (
    <>
      <div className="w-full py-3">
        <section className="bg-white text-black flex flex-col w-full xl:flex-row lg:justify-between">
          <div className="left w-full xl:w-[75%] p-2 flex flex-col md:flex-row">
            <div className="left w-full md:w-[40%]">
              <div className="img w-full h-[300px]">
                <img
                  src={product && product.data.frontImage}
                  className="w-full h-full"
                  alt="product"
                />
              </div>
              <div className="flex items-center gap-2 w-full flex-wrap mt-2">
                <img
                  src={product && product.data.image1}
                  className="w-[80px] h-[80px]"
                  alt="image1"
                />
                <img
                  src={product && product.data.image2}
                  className="w-[80px] h-[80px]"
                  alt="image1"
                />
                <img
                  src={product && product.data.image3}
                  className="w-[80px] h-[80px]"
                  alt="image1"
                />
                {/* <img
                  src="/sliderimg/p1.webp"
                  className="w-[80px] h-[80px]"
                  alt="image1"
                /> */}
              </div>
            </div>
            <div className="right w-full md:w-[60%] px-0 md:px-4">
              <div className="title">
                <h2 className="text-xl my-2">
                  {product && product.data.name}
                </h2>
              </div>
              <div className="ratings flex items-center justify-between mt-4">
                <div className="rating flex items-center">
                  <div className="stars text-[10px] flex items-center">
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    <i className="fa-solid fa-star-half text-yellow-400"></i>
                  </div>
                  <h3 className="text-xs text-blue-500 ms-1 hover:underline cursor-pointer">
                    {product && product.data.reviews.total} Ratings
                  </h3>
                </div>
                <div className="share flex items-center text-lg gap-2 text-[rgb(158,158,158)]">
                  <i className="fa-solid fa-share cursor-pointer"></i>
                  <i className="fa-regular fa-heart cursor-pointer"></i>
                </div>
              </div>
              <div className="brands mt-4 flex items-center text-sm flex-wrap justify-between">
                <div className="brand flex-wrap sm:flex-nowrap flex items-center gap-1">
                  <div className="flex items-center">
                    <h2>Brand:</h2>
                    <Link
                      to={"/"}
                      className="text-blue-500 hover:underline ms-1"
                    >
                      No Brand
                    </Link>
                  </div>
                  |
                  <Link to={"/"} className="text-blue-500 hover:underline">
                    More Mobile Accessories from No Brand
                  </Link>
                </div>
                <div className="about-product">Free Shipping</div>
              </div>
              <hr className="mt-4" />
              <div className="price mt-3">
                <div>
                  <h2 className="text-3xl text-site-color">Rs. {product && product.data.price}</h2>
                </div>
                <div className="discount text-sm flex items-center gap-1">
                  <h2 className="line-through">Rs. {product && product.data.discountPrice}</h2>
                  <h2>-40%</h2>
                </div>
              </div>
              <div className="color mt-4 flex flex-row">
                <div className="name text-sm text-gray-600">
                  <h2>Color Family:</h2>
                </div>
                <div className="color-value ms-2">
                  <h2 className="text-sm">{product && product.data.color}</h2>
                  <div className="flex items-center flex-row flex-wrap gap-1">
                    <img
                      src={product && product.data.image1}
                      className="w-[40px] h-[40px]"
                      alt="image1"
                    />
                    <img
                      src={product && product.data.image2}
                      className="w-[40px] h-[40px]"
                      alt="image1"
                    />
                    <img
                      src={product && product.data.image3}
                      className="w-[40px] h-[40px]"
                      alt="image1"
                    />
                  </div>
                </div>
              </div>
              <div className="quantity mt-7 flex flex-row">
                <h2 className="text-sm text-gray-600">Quantity:</h2>
                <div className="flex items-center ms-8 gap-5 text-lg">
                  <button
                    className={`py-1 px-3 bg-gray-200 ${quantity == 1 ? "text-white bg-gray-300" : ""
                      } text-xl font-bold hover:text-white hover:bg-gray-300`}
                    onClick={() => setquantity(quantity > 1 ? quantity - 1 : 1)}
                  >
                    -
                  </button>
                  <h2>{quantity}</h2>
                  <button
                    className={`py-1 px-3 bg-gray-200 ${quantity == 4 ? "text-white bg-gray-300" : ""
                      } text-xl font-bold hover:text-white hover:bg-gray-300`}
                    onClick={() =>
                      setquantity(quantity >= 4 ? 4 : quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="btns flex items-center justify-between gap-3 mt-5 flex-col md:flex-row text-lg pb-2">
                <button className="w-full bg-[rgb(42,187,232)] py-2 text-white hover:bg-[rgb(29,165,206)] font-semibold">
                  Buy Now
                </button>
                <button className="w-full hover:bg-[rgb(228,94,27)] bg-site-color py-2 text-white font-semibold" onClick={addToCartHandler}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="right w-full xl:w-[25%] flex flex-wrap bg-[rgb(250,250,250)]">
            <div className="address p-2 w-full">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <h3 className="text-sm">Delivery Options </h3>
                <i className="fa-solid fa-circle-info"></i>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="location flex gap-4">
                  <i className="fa-solid fa-location-dot text-xl text-gray-400"></i>
                  <h2 className="text-sm w-2/3">
                    Khyber Pakhtunkhwa, Swabi, Kalu Khan
                  </h2>
                </div>
                <button className="text-blue-500 text-sm hover:underline">
                  CHANGE
                </button>
              </div>
              <hr className="mt-2" />

              <div className="flex items-center justify-between flex-row mt-3">
                <div className="location flex gap-4">
                  <i className="fa-solid fa-truck text-xl text-gray-400"></i>
                  <div>
                    <h2 className="text-sm">Standard Delivery</h2>
                    <p className="text-xs text-gray-400">
                      Guaranteed {product && product.data.return}
                    </p>
                  </div>
                </div>
                <h3>Rs. {product && product.data.deliveryPrice}</h3>
              </div>
              <div className="flex items-center flex-row mt-3 gap-4">
                <i className="fa-solid fa-sack-dollar text-xl text-gray-400"></i>
                <h2 className="text-sm">Cash on Delivery Available</h2>
              </div>
              <hr className="mt-2" />
            </div>
            <div className="warrenty mt-3 p-2 w-full">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <h3 className="text-sm">Return & Warranty </h3>
                <i className="fa-solid fa-circle-info"></i>
              </div>
              <div className="flex items-center flex-row mt-3 gap-4">
                <i className="fa-solid fa-arrow-rotate-left text-xl text-gray-400"></i>
                <h2 className="text-sm">Return {product && product.data.return}</h2>
              </div>
              <div className="flex items-center flex-row mt-3 gap-4">
                <i className="fa-regular fa-circle-xmark text-xl text-gray-400"></i>
                <h2 className="text-sm">Warranty {product && product.data.warranty}</h2>
              </div>
            </div>
            <div className="bg-white h-2 w-full"></div>
            <div className="shipping p-2 w-full">
              <h2 className="text-sm">Ship on Time</h2>
              <h2 className="text-2xl font-semibold">100%</h2>
            </div>
          </div>
        </section>
        <section className="descriptions bg-white text-black mt-2">
          <div className="p-4">
            <div>
              <h2 className="text-lg font-semibold">
                Product Short Description
              </h2>
              <p>
                {product && product.data.shortDescription}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mt-4">
                Product Long Description
              </h2>
              <p>
                {product && product.data.longDescription}
              </p>
            </div>
          </div>
        </section>
        <section className="reviews bg-white text-black mt-2">
          <h2 className="text-lg px-4 font-semibold py-2 line-clamp-1 bg-[rgb(250,250,250)]">Ratings & Reviews of </h2>
          <div className="p-4">
            <div className="review">
              <div className="flex items-center mt-2">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star-half text-yellow-400"></i>
                <h3 className="text-blue-600 hover:underline cursor-pointer">
                  Ratings ({product && product.data.reviews.total})
                </h3>
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <h2 className="text-lg font-semibold my-2 px-4">Product Reviews</h2>
          <hr />
          <div className="flex flex-col pt-1">
            {
              product && product.data.reviews.comment.map((data, index) => (
                <Comment key={index} review={review} />
              ))
            }
          </div>
        </section>
      </div>
    </>
  );
}

export default SingleProduct;
