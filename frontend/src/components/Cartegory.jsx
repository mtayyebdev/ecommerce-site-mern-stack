import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cartegory() {
  const [dropdown, setdropdown] = useState(false);
  return (
    <>
      <div className="px-3 w-full border-b border-gray-200 bg-white flex items-center justify-start h-[30px] text-black">
        <div className="category relative w-[200px]">
          <button
            className="flex items-center w-full justify-between px-2 cursor-pointer"
            onClick={() => setdropdown(!dropdown)}
          >
            <h2 className="font-semibold">Categories</h2>
            <i className="fa-solid fa-caret-down"></i>
          </button>
          <div
            className={`list ${
              dropdown
                ? "translate-y-0 transition-all z-[5]"
                : "-translate-y-[100%] transition-all -z-10"
            } absolute bg-white mt-[2px] text-black px-2 py-1 w-[200px]`}
          >
            <ul className="relative">
              <Link to={"/"}>
                <li className="border-b hover:text-site-color border-white mb-1">
                  Male
                </li>
              </Link>
              <Link to={"/"} className="dropdown">
                <li className="border-b hover:text-site-color border-white mb-1 flex items-center justify-between">
                  <p>Female</p>
                  <i className="fa-solid fa-caret-right"></i>
                </li>
                <ul className="dropdown-list text-black px-2 py-1 w-[200px] bg-white">
                  <Link to={"/"}>
                    <li className="border-b hover:text-site-color border-white mb-1">
                      Shose
                    </li>
                  </Link>
                  <Link to={"/"}>
                    <li className="border-b hover:text-site-color border-white mb-1">
                      Jwellary
                    </li>
                  </Link>
                  <Link to={"/"}>
                    <li className="border-b hover:text-site-color border-white mb-1">
                      MackUp
                    </li>
                  </Link>
                </ul>
              </Link>
              <Link to={"/"}>
                <li className="border-b hover:text-site-color border-white mb-1">
                  Home & Deco
                </li>
              </Link>
              <Link to={"/"}>
                <li className="border-b hover:text-site-color border-white mb-1">
                  Electronics
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cartegory;
