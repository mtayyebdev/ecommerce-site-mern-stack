import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comment } from "../components/index.js";
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleProduct } from '../store/slices/productSlices/GetSingleProductSlice.jsx'
import { CreateCart } from '../store/slices/cartSlices/CreateCartSlice.jsx'
import { GetCart } from '../store/slices/cartSlices/GetCartSlice.jsx'
import { toast } from "react-toastify";
import { SendProductsComment } from '../store/slices/productSlices/SendProductsCommentSlice.jsx'
import { GetProductsReviews } from '../store/slices/productSlices/GetProductsReviewsSlice.jsx'
import { orderData } from '../store/slices/orderSlices/PendingOrderSlice.jsx'

function SingleProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product } = useSelector((state) => state.getsingleproduct)
  const { reviews } = useSelector((state) => state.getproductsreviews)
  const { id } = useParams();
  const [quantity, setquantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [images, setimages] = useState(null);
  let ratings = [];

  // comment box data...................
  const [stars, setstars] = useState(
    [
      { fill: "regular" },
      { fill: "regular" },
      { fill: "regular" },
      { fill: "regular" },
      { fill: "regular" }
    ]
  )
  const [ratingsCount, setratingsCount] = useState(0)
  const [message, setmessage] = useState("")
  const [image, setimage] = useState(null)
  const [loader, setloader] = useState(false)

  const getsingleproduct = async (id) => {
    await dispatch(GetSingleProduct(id))
      .then((res) => {
        if (res.type === "getsingleproduct/fulfilled") {
          setimages(res.payload.data.gallaryImages[0])
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getProductsreviewsHandler = async (id) => {
    try {
      await dispatch(GetProductsReviews(id))
      // .then((res) => {
      //   if (res.type == "getproductsreviews/fulfilled") {
      //     console.log(res.payload.data);
      //   }
      // })
    } catch (error) {
      console.log("reviews error: ", error);
    }
  }

  useEffect(() => {
    getsingleproduct(id)
    getProductsreviewsHandler(id)
  }, [id])

  const addToCartHandler = async () => {
    if (product.data.color[0] != "none") {
      if (!selectedColor) {
        return toast.error("Please select Color.")
      }
    }
    if (product.data.size[0] != "none") {
      if (!selectedSize) {
        return toast.error("Please select Size.")
      }
    }
    await dispatch(CreateCart({ quantity, id, selectedColor, selectedSize }))
    await dispatch(GetCart())
  }

  const buyProductHandler = async () => {
    if (product.data.color[0] != "none") {
      if (!selectedColor) {
        return toast.error("Please select Color.")
      }
    }
    if (product.data.size[0] != "none") {
      if (!selectedSize) {
        return toast.error("Please select Size.")
      }
    }

    const totaldata = {
      name: product && product.data.name,
      image: images,
      price: product && product.data.price,
      discount: product && product.data.discountPrice,
      deliveryPrice: product && product.data.deliveryPrice,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      returns: product && product.data.returns,
      category: product && product.data.category,
      guarantee: product && product.data.warranty,
      productId: product && product.data._id
    }
    dispatch(orderData(totaldata))
    navigate("/checkout")
  }

  function calculateDiscountPercentage(originalPrice, discountedPrice) {
    // Discount amount calculate karo
    const discountAmount = originalPrice - discountedPrice;
    // Discount percentage calculate karo
    const discountPercentage = (discountAmount / originalPrice) * 100;
    // Result return karo
    return discountPercentage;
  }

  const discount = calculateDiscountPercentage(product && product.data.discountPrice, product && product.data.price);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const starsHandler = (index) => {
    const newStars = stars.map((star, i) => ({
      fill: i <= index ? "solid" : "regular"
    }));
    setratingsCount(index + 1)
    setstars(newStars)
  }

  const SendProductCommentHandler = async () => {
    setloader(true);

    try {
      const data = new FormData();
      data.append("image", image);
      data.append("rating", ratingsCount);
      data.append("message", message)
      await dispatch(SendProductsComment({ id, data }))
        .then((res) => {
          if (res.type === "sendproductscomment/fulfilled") {
            dispatch(GetProductsReviews(id));
          }
        })
    } catch (error) {
      console.log("Comment Sending error: ", error);
    }
    setloader(false)
  }

  let count = 0;
  reviews && reviews.forEach((r, i) => {
    count += r.rating;
  })

  // for (let i = 1; i <= count; i++) {
  //   ratings[i] = "star"
  // }
  if (count < 20) {
    ratings = ["star"];
  } else if (count < 50) {
    ratings = ["star", "star"]
  } else if (count < 80) {
    ratings = ["star", "star", "star"]
  } else if (count < 140) {
    ratings = ["star", "star", "star", "star"]
  } else {
    ratings = ["star", "star", "star", "star", "star"]
  }

  return (
    <>
      <div className="w-full py-3">
        <section className="bg-white text-black flex flex-col w-full xl:flex-row lg:justify-between">
          <div className="left w-full xl:w-[75%] p-2 flex flex-col md:flex-row">
            <div className="left w-full md:w-[40%]">
              <div className="img w-full h-[300px]">
                <img
                  src={images}
                  className="w-full h-full"
                  alt="product"
                />
              </div>
              <div className="flex items-center gap-2 w-full flex-wrap mt-2">
                {
                  product && product.data.gallaryImages.slice(0, 4).map((imgs) => (
                    <img
                      src={imgs}
                      className="w-[80px] cursor-pointer h-[80px]"
                      alt="product"
                      onClick={(e) => setimages(e.target.src)
                      }
                    />
                  ))
                }
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
                    {
                      ratings.map((star, i) => (
                        <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                      ))
                    }
                  </div>
                  <h3 className="text-xs text-blue-500 ms-1 hover:underline cursor-pointer">
                    {count} Ratings
                  </h3>
                </div>
                <div className="share flex items-center text-lg gap-2 text-[rgb(158,158,158)]">
                  <i className="fa-solid fa-share cursor-pointer"></i>
                  <i className="fa-regular fa-heart cursor-pointer"></i>
                </div>
              </div>
              <hr className="mt-4" />
              <div className="price mt-3">
                <div>
                  <h2 className="text-3xl text-site-color">Rs. {product && product.data.price}</h2>
                </div>
                <div className="discount text-sm flex items-center gap-1">
                  <h2 className="line-through">Rs. {product && product.data.discountPrice}</h2>
                  <h2>{discount}%</h2>
                </div>
              </div>
              <div className="color mt-4 flex flex-col">
                <div className="name text-sm text-gray-600">
                  <h2>Color Family:</h2>
                </div>
                <div className="color-value">
                  <div className="flex items-center space-x-2 mt-1">
                    {product && product.data.color.map((c, index) => (
                      c != "none" ? <div
                        key={index}
                        className={`
                          rounded-full w-[25px] h-[25px] ${c == "black" ? "bg-black" : `bg-${c}-600`} cursor-pointer ${selectedColor === c ? "border-[3px] border-gray-400" : "border-[1px] border-transparent"}
                          `}
                        onClick={() => handleColorSelect(c)}
                      ></div> : "None"
                    ))}
                  </div>
                </div></div>
              <div className="size mt-4 flex flex-col">
                <div className="name text-sm text-gray-600">
                  <h2>Size:</h2>
                </div>
                <div className="size-value">
                  <div className="flex items-center space-x-2 mt-1 flex-wrap">
                    {product && product.data.size.map((s, index) => (
                      s != "none" ? <div
                        key={index}
                        className={`w-[40px] h-[40px] flex items-center justify-center text-sm font-medium rounded-md cursor-pointer border-[2px] ${selectedSize === s
                          ? "border-gray-400 bg-gray-100"
                          : "border-gray-200 bg-white"
                          }`}
                        onClick={() => handleSizeSelect(s)}
                      >
                        {s}
                      </div> : "None"
                    ))}
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
                {
                  product && product.data.stock > 0 ? <>
                    <button className="w-full bg-[rgb(42,187,232)] py-2 text-white hover:bg-[rgb(29,165,206)] font-semibold" onClick={buyProductHandler}>
                      Buy Now
                    </button>
                    <button className="w-full hover:bg-[rgb(228,94,27)] bg-site-color py-2 text-white font-semibold" onClick={addToCartHandler}>
                      Add to Cart
                    </button>
                  </> :
                    <p className="text-green-600 font-semibold">Out of Stock</p>
                }
              </div>
            </div>
          </div>
          <div className="right w-full xl:w-[25%] flex flex-wrap bg-[rgb(250,250,250)]">
            <div className="address p-2 w-full">
              <div className="flex items-center justify-between flex-row">
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
            <div className="warrenty p-2 w-full">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <h3 className="text-sm">Return & Warranty </h3>
                <i className="fa-solid fa-circle-info"></i>
              </div>
              <div className="flex items-center flex-row mt-3 gap-4">
                <i className="fa-solid fa-arrow-rotate-left text-xl text-gray-400"></i>
                <h2 className="text-sm">Return {product && product.data.returns}</h2>
              </div>
              <div className="flex items-center flex-row mt-3 gap-4">
                <i className="fa-regular fa-circle-xmark text-xl text-gray-400"></i>
                <h2 className="text-sm">Warranty {product && product.data.warranty}</h2>
              </div>
              <div className="flex items-center flex-row mt-3 gap-4">
                <i className="fa-solid fa-arrow-trend-up text-xl text-gray-400"></i>
                <h2 className="text-sm">Stock {product && product.data.stock}</h2>
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
                {
                  ratings.map((star, i) => (
                    <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                  ))
                }
                <h3 className="text-blue-600 ms-1 hover:underline cursor-pointer">
                  Ratings ({count})
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col py-2 px-4">
            <h2 className="text-base font-semibold">Enter Product Reviews</h2>
            <div className="flex mt-1 items-start">
              {
                stars.map((star, i) => (
                  <i className={`fa-${star.fill} text-yellow-400 fa-star`} key={i} onClick={() => starsHandler(i)}></i>
                ))
              }
              <h3 className="text-sm font-semibold ms-2">Rating Count ({ratingsCount})</h3>
            </div>
            <div className="message mt-2">
              <textarea name="message" className="outline-none w-[250px] focus:ring-gray-500 focus:ring-1 p-1 border border-gray-500 rounded-md" id="message" placeholder="Enter your comment." value={message} onChange={(e) => setmessage(e.target.value)} rows={4}></textarea>

              <label htmlFor="file">
                <div className="border border-gray-500 w-[250px] rounded p-1 flex items-center justify-center h-[120px] hover:bg-gray-100 cursor-pointer">
                  {
                    !image ? <><h2 className="text-lg font-semibold">Select Image</h2></> : <img src={URL.createObjectURL(image)} alt="image" className="w-auto rounded h-full" />
                  }
                </div>
              </label>
              <input type="file" accept=".jpg, .png, .wepb, .jpeg, .svg" name="file" id="file" onChange={(e) => setimage(e.target.files[0])} className="hidden" />
            </div>
            <div className="flex items-center justify-start mt-2">
              <button className="py-1 px-3 bg-site-color/90 hover:bg-site-color rounded-md font-semibold text-white" onClick={SendProductCommentHandler}>{loader ? "Loading..." : "Send Comment"}</button>
            </div>
          </div>
          <hr className="mt-2" />
          <h2 className="text-lg font-semibold my-2 px-4">Product Reviews</h2>
          <hr />
          <div className="flex flex-col pt-1">
            {
              reviews && reviews.map((data, index) => (
                <Comment key={index} review={data} />
              ))
            }
          </div>
        </section>
      </div>
    </>
  );
}

export default SingleProduct;
