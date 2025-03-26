import React from "react";
import {Link} from 'react-router-dom'

function Product({ image, name, price, discount,id }) {
  return (
    <>
      <div className="w-full max-w-[190px] h-[300px] hover:shadow-lg">
        <Link to={`/product/${id}`}>
        <div>
          <div className="image">
            <img src={image} className="w-full h-[180px]" alt="" />
          </div>
          <div className="content p-2">
            <h3 className="line-clamp-2 text-sm">{name}</h3>
            <p className="text-site-color">Rs.{price}</p>
            <p className="line-through text-xs text-gray-400">Rs.{discount}</p>
          </div>
        </div>
        </Link>
      </div>
    </>
  );
}

export default Product;
