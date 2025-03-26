import React from "react";

function Comment({review}) {
  return (
    <div className="my-1 py-2 px-4 bg-white">
      <div className="flex text-xs mt-1 items-center">
      {[...Array(5)].map((_, index) => (
        <i
          key={index}
          className={`fa-solid fa-star ${
            index < review.rating ? "text-yellow-400" : "text-gray-300"
          }`}
        ></i>
      ))}
      </div>
      <div className="flex gap-3">
        <h2>{review.name}</h2>
      </div>
      <div className="message mt-2">
        <p>{review.message}</p>
      </div>
      {review.image&&<div className="images mt-2">
        <img
          src={review.image}
          className="w-[100px] h-[100px]"
          alt="product image"
        />
      </div>}
      <hr className="mt-2"/>
    </div>
  );
}

export default Comment;
