import React, { useState } from "react";
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

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Home() {
  const [showMore, setshowMore] = useState(20);

  const products = [
    {
      id:1,
      image: "/sliderimg/p1.webp",
      name: "Airpods_Pro Wireless Earbuds Bluetooth 5.0",
      price: 200,
      discount: 500,
    },
    {
      id:2,
      image: "/sliderimg/p2.webp",
      name: "Samsung Galaxy Watch 4 - Smartwatch",
      price: 250,
      discount: 300,
    },
    {
      id:3,
      image: "/sliderimg/p3.webp",
      name: "Sony WH-1000XM4 Noise Cancelling Headphones",
      price: 350,
      discount: 400,
    },
    {
      id:4,
      image: "/sliderimg/p4.webp",
      name: "Apple iPhone 14 Pro - 256GB",
      price: 1200,
      discount: 1500,
    },
    {
      id:5,
      image: "/sliderimg/p5.webp",
      name: "Bose SoundLink Revolve+ Bluetooth Speaker",
      price: 150,
      discount: 250,
    },
    {
      id:6,
      image: "/sliderimg/p6.webp",
      name: "Logitech MX Master 3 Wireless Mouse",
      price: 100,
      discount: 180,
    },
  ];

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
                {products.slice(0, 6).map((data, i) => {
                  return (
                    <Product
                      key={i}
                      image={data.image}
                      name={data.name}
                      discount={data.discount}
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
                {products.slice(0, showMore).map((data, i) => {
                  return (
                    <Product
                      key={i}
                      image={data.image}
                      name={data.name}
                      discount={data.discount}
                      price={data.price}
                      id={data.id}
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
