import React from "react";

function Comment() {
  return (
    <div className="my-1 py-2 px-4 bg-white">
      <div className="flex text-xs mt-1 items-center">
        <i className="fa-solid fa-star text-yellow-400"></i>
        <i className="fa-solid fa-star text-yellow-400"></i>
        <i className="fa-solid fa-star text-yellow-400"></i>
        <i className="fa-solid fa-star text-yellow-400"></i>
        <i className="fa-solid fa-star text-gray-300"></i>
      </div>
      <div className="flex gap-3">
        <h2>tayyebkhan</h2>
        <div className="flex items-center gap-1 font-semibold">
          <i className="fa-solid fa-circle-check text-green-600"></i>
          <h3 className="text-sm text-green-600">Verified Purchase</h3>
        </div>
      </div>
      <div className="message mt-2">
        <p>good product and fast delivery</p>
      </div>
      <div className="images mt-2">
        <img
          src="/sliderimg/p4.webp"
          className="w-[100px] h-[100px]"
          alt="product image"
        />
      </div>
    </div>
  );
}

export default Comment;
