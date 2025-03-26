import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Parallax,
  Controller,
} from "swiper/modules";
import { Product } from "../components/index.js";
import { useDispatch, useSelector } from 'react-redux'
import { GetProducts } from '../store/slices/productSlices/GetProductsSlice.jsx'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Home() {
  const {products}=useSelector((state)=>state.getproducts)
  const dispatch = useDispatch()
  const [showMore, setshowMore] = useState(20);

  useEffect(() => {
    dispatch(GetProducts())
  }, [])
  

  return (
    <>
      <div className="px-3">
        <section>
          <div className="w-full flex items-center justify-between">
            <div className="slider w-full md:w-[80%]">
              <Swiper
                // install Swiper modules
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Parallax,
                  Controller,
                  Autoplay,
                ]}
                spaceBetween={50}
                slidesPerView={1}
                // Parallax
                controller={true}
                autoplay={true}
                // navigation
                pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              >
                <SwiperSlide>
                  <img src="/sliderimg/img1.webp" alt="slide1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/sliderimg/img2.webp" alt="slide2" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/sliderimg/img3.webp" alt="slide3" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/sliderimg/img4.webp" alt="slide4" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/sliderimg/img6.webp" alt="slide6" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/sliderimg/img7.webp" alt="slide7" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/sliderimg/img8.webp" alt="slide8" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="w-[20%] hidden md:block bg-black">fhlsdf</div>
          </div>
        </section>
        <section className="mt-9">
          <div className="w-full">
            <h2 className="text-2xl font-semibold">Flash Sale</h2>
            <div className="w-full flex flex-col bg-white mt-1">
              <div className="top flex items-center justify-between border-b py-3 px-3 border-gray-300">
                <p className="text-site-color text-sm ms-0 sm:ms-3">
                  On Sale Now
                </p>
                <Link to={"/"}>
                  <button className="py-1 hover:bg-site-color hover:text-white px-2 sm:px-3 border border-site-color text-site-color text-xs sm:text-base font-semibold">
                    SHOP ALL PRODUCTS
                  </button>
                </Link>
              </div>
              <div className="products my-2 flex items-center flex-wrap lg:flex-nowrap gap-3 justify-center">
                {products && products.data.slice(0, 6).map((data, i) => {
                  return (
                    <Product
                      key={i}
                      image={data.gallaryImages[0]}
                      id={data._id}
                      name={data.name}
                      discount={data.discountPrice}
                      price={data.price}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="mt-9">
          <div className="w-full">
            <h2 className="text-2xl font-semibold">Just For You</h2>
            <div className="w-full flex flex-col bg-white mt-1">
              <div className="products my-2 flex items-center flex-wrap gap-3 justify-center">
                {products && products.data.slice(0, showMore).map((data, i) => {
                  return (
                    <Product
                      key={i}
                      image={data.gallaryImages[0]}
                      name={data.name}
                      discount={data.discountPrice}
                      price={data.price}
                      id={data._id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <div className="w-full flex justify-center py-5">
          <button
            className="py-2 w-full sm:w-[70%] mx-auto text-center border text-site-color font-semibold border-site-color hover:text-white hover:bg-site-color transition-all"
            onClick={() => setshowMore(products.length)}
          >
            LOAD MORE
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
