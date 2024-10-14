import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [searchBox, setsearchBox] = useState("")
  const [list, setlist] = useState(false)

  const searchHandler = (e) => {
    setsearchBox(e.target.value)
    if(e.target.value.length >=1){
      setlist(true)
    }else{
      setlist(false)
    }
  }

  return (
    <>
      <div className="w-full flex flex-col px-3 bg-site-color py-1 text-white">
        <div className="container mx-auto">
          <div className="top flex items-center justify-end">
            <ul className="flex items-center justify-end gap-3 sm:gap-5 md:gap-8 text-xs sm:text-sm font-semibold">
              <li>
                <Link
                  to={"/"}
                  className="hover:text-gray-200 whitespace-nowrap"
                >
                  HELP & SUPPORT
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="hover:text-gray-200">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to={"/signup"} className="hover:text-gray-200">
                  SIGNUP
                </Link>
              </li>
              <li>
                <Link to={"/user"} className="hover:text-gray-200">
                  M TAYYEB'S ACOOUNT
                </Link>
              </li>
              <li>
                <Link to={"/"} className="hover:text-gray-200">
                  LANGUAGE
                </Link>
              </li>
            </ul>
          </div>
          <div className="center flex items-center justify-between sm:justify-start my-3">
            <div className="logo text-xl font-bold">
              <Link to={"/"} className="flex items-center">
                <img src="/shophub.png" className="w-[100px]" alt="shophub logo" />
              </Link>
            </div>
            <div className="box flex items-center">
              <div className="items-center hidden sm:flex">
                <div className="relative ms-5 md:ms-[60px] lg:ms-[120px]">
                  <input
                    type="text"
                    className="py-2 px-3 outline-none w-[200px] md:w-[300px] lg:w-[400px] border-white border text-base bg-white text-black"
                    name="search"
                    id="search"
                    value={searchBox}
                    onChange={searchHandler}
                    placeholder="Search Here..."
                  />
                  <div className={`absolute ${list?"block":"hidden"} top-10 left-0 text-black bg-white w-full py-1 shadow-md`}>
                    <ul>
                      <li className="my-1 hover:bg-slate-100">
                        <Link to={"/shop?search=home"} className="w-full">
                          <div className="py-1 px-3">
                            <h3>decorations</h3>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <button className="text-site-color bg-[rgb(255,225,210)] hover:bg-[rgb(241,206,188)] text-xl py-[7px] px-3">
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
              <div className="cart ms-5 md:ms-8">
                <Link
                  to={"/cart"}
                  className="py-1 px-2 sm:py-2 sm:px-3 text-lg text-site-color hover:bg-[rgb(241,206,188)] bg-[rgb(255,225,210)]"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="items-center w-full flex sm:hidden">
            <input
              type="text"
              className="py-2 px-3 outline-none w-full border-white border text-base bg-white text-black"
              name="search"
              id="search"
              placeholder="Search Here..."
            />
            <button className="text-site-color bg-[rgb(255,225,210)] hover:bg-[rgb(241,206,188)] text-xl py-[7px] px-3">
              <i className="fa-solid fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
