import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="w-full">
        <div className="pt-10 pb-4 w-full sm:w-[80%] md:w-[70%] mx-auto">
          <div className="flex justify-between flex-wrap items-center mb-3">
            <h2 className="text-lg font-semibold sm:text-xl">
              Welcome to ShopHub! Please login.
            </h2>
            <div className="flex items-center text-sm">
              <p>
                New member?{" "}
                <Link to={"/signup"} className="text-blue-600">
                  Register
                </Link>{" "}
                here.
              </p>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="mx-auto w-full sm:w-[90%] md:w-[70%] py-8 px-3">
              <h2 className="font-semibold">Login with Password</h2>
              <form className="mt-3 text-base">
                <div>
                  <div className="py-1 text-sm font-semibold">
                    <label htmlFor="phone">Phone Number*</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Please enter your phone number..."
                      className="outline-none w-full py-2 px-2 border border-gray-300"
                    />
                    <i className="fa-solid fa-close text-sm border border-gray-300 py-[2px] px-1.5 rounded-full text-white bg-gray-300 cursor-pointer absolute right-3 top-2"></i>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between py-1">
                    <label htmlFor="password" className="text-sm font-semibold">
                      Password*
                    </label>
                    <Link
                      to={"/"}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="password"
                      id="password"
                      placeholder="Please enter your password"
                      className="outline-none w-full py-2 px-2 border border-gray-300"
                    />
                    <div className="flex items-center gap-2 absolute right-3 top-1">
                      <i className="fa-solid fa-close text-sm border border-gray-300 py-[2px] px-1.5 rounded-full text-white bg-gray-300 cursor-pointer"></i>
                      <i className="fa-solid fa-eye py-1 px-1.5 rounded-full text-gray-400 text-lg cursor-pointer"></i>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-site-color hover:bg-orange-500 py-2 w-full text-base mt-6"
                >
                  Login
                </button>
              </form>
              <div className="flex items-center mt-5 w-full">
                <hr className="w-full" />
                <p className="whitespace-nowrap text-gray-500 text-sm">
                  Or, Login with
                </p>
                <hr className="w-full" />
              </div>
              <div className="flex items-center flex-col sm:flex-row justify-between w-full mt-5 gap-3">
                <div className="flex items-center cursor-pointer justify-center gap-2 border border-black rounded-lg py-1 px-2 w-full sm:w-1/2">
                  <i className="fa-brands fa-facebook text-blue-600 text-xl"></i>
                  <p>Facebook</p>
                </div>
                <div className="flex items-center justify-center gap-2 border cursor-pointer border-black rounded-lg py-1 px-2 w-full sm:w-1/2">
                  <i className="fa-brands fa-google text-orange-500 text-xl"></i>
                  <p>Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
