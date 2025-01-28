import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { UserData } from '../store/slices/userSlices/UserdataSlice'
import { Logout } from '../store/slices/userSlices/LogoutSlice'
import Tooltip from "./Tooltip.jsx";
import { GetCart } from '../store/slices/cartSlices/GetCartSlice.jsx'


function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.userdata);
  const { cart } = useSelector((state) => state.getcart)
  const [searchBox, setsearchBox] = useState("")
  const [list, setlist] = useState(false)

  useEffect(() => {
    dispatch(UserData())
    dispatch(GetCart())
  }, [])

  const searchHandler = (e) => {
    setsearchBox(e.target.value)
    if (e.target.value.length >= 1) {
      setlist(true)
    } else {
      setlist(false)
    }
  }

  const logoutHandler = async () => {
    try {
      // Step 1: Logout the user
      await dispatch(Logout());

      // Step 2: Optionally clear user data and cart if required
      await dispatch(UserData());
      await dispatch(GetCart());

      // Step 3: Navigate to the home page
      // navigate("/");
    } catch (error) {
      console.error("Logout process failed:", error);
    }
  }


  return (
    <>
      <div className="w-full flex flex-col px-3 bg-site-color py-1 text-white">
        <div className="container mx-auto">
          <div className="top hidden sm:flex items-center justify-end">
            <ul className="flex items-center justify-end gap-3 sm:gap-5 md:gap-8 text-xs sm:text-sm font-semibold">
              <li>
                <Link
                  to={"/"}
                  className="hover:text-gray-200 whitespace-nowrap"
                >
                  HELP & SUPPORT
                </Link>
              </li>
              {
                user !== null ? <li onClick={logoutHandler} className="hover:text-gray-200 cursor-pointer">LOGOUT</li> : <>
                  <li>
                    <Link to={"/login"} className="hover:text-gray-200">
                      LOGIN
                    </Link>
                  </li>
                  {/* <li>
                  <Link to={"/signup"} className="hover:text-gray-200">
                    SIGNUP
                  </Link>
                </li> */}
                </>}
              {
                user !== null && <li>
                  <Link to={"/user"} className="hover:text-gray-200 hidden sm:block uppercase">
                    {user && user.data.name} ACCOUNT
                  </Link>
                  <Link to={"/user"} className="hover:text-gray-200 bg-gray-200 rounded-full block sm:hidden">
                    <i className="fa-solid fa-user text-[18px] p-2"></i>
                  </Link>
                </li>
              }
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
                  <div className={`absolute ${list ? "block" : "hidden"} top-10 z-10 left-0 text-black bg-white w-full py-1 shadow-md`}>
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
              <ul className="flex sm:hidden items-center justify-end gap-2">

                <li>
                  <Tooltip text={"Help"} angle={"top"}>
                    <Link
                      to={"/"}
                      className="py-1 px-[10px] text-lg text-site-color hover:bg-[rgb(241,206,188)] bg-[rgb(255,225,210)]"
                    >
                      <i className="fa-solid fa-question"></i>
                      {/* HELP & SUPPORT */}
                    </Link>
                  </Tooltip>
                </li>
                {
                  user == null &&
                  <Tooltip text={"Login"} angle={"top"}>
                    <li>
                      <Link to={"/login"} className="py-1 px-2 text-lg text-site-color hover:bg-[rgb(241,206,188)] bg-[rgb(255,225,210)]">
                        <i className="fa-solid fa-sign-in"></i>
                        {/* LOGIN */}
                      </Link>
                    </li>
                  </Tooltip>
                }
                {
                  user !== null && <li>
                    <Tooltip text={"Account"} angle={"top"}>
                      <Link to={"/user"} title="Account" className="py-1 px-2 text-lg text-site-color hover:bg-[rgb(241,206,188)] bg-[rgb(255,225,210)] text-[18px]">
                        <i className="fa-solid fa-user"></i>
                      </Link>
                    </Tooltip>
                  </li>
                }
                <li>
                  <Tooltip text={"Language"} angle={"top"}>
                    <Link to={"/"} title="Language" className="py-1 px-2 text-lg text-site-color hover:bg-[rgb(241,206,188)] bg-[rgb(255,225,210)]">
                      <i className="fa-solid fa-language"></i>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
              <div className="cart ms-2 sm:ms-4 md:ms-8">
              <Tooltip text={"Cart"} angle={"top"}>
                <Link
                  to={"/cart"}
                  className="py-1 px-2 relative sm:py-2 sm:px-3 text-lg text-site-color hover:bg-[rgb(241,206,188)] bg-[rgb(255,225,210)]"
                >
                  <p className="absolute -top-1 -right-1 text-white text-xs bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">{cart && cart.data.length}</p>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </Tooltip>
              </div>
            </div>
          </div>
          <div className="items-center w-full flex sm:hidden">
            <div className="relative">
              <input
                type="text"
                className="py-2 px-3 outline-none w-full border-white border text-base bg-white text-black"
                name="search"
                id="search"
                value={searchBox}
                onChange={searchHandler}
                placeholder="Search Here..."
              />
              <div className={`absolute ${list ? "block" : "hidden"} top-10 left-0 text-black bg-white w-full py-1 shadow-md`}>
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
        </div>
      </div>
    </>
  );
}

export default Header;
