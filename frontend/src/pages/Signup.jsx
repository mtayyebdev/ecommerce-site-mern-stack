import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from '../store/slices/userSlices/SignupSlice'

function Signup() {
  const navigate = useNavigate()
  const { loader } = useSelector((state) => state.signup)
  const dispatch = useDispatch()
  const [username, setusername] = useState("")
  const [phone, setphone] = useState(0)
  const [smsCode, setsmsCode] = useState(0)
  const [password, setpassword] = useState("")
  const [birthday, setbirthday] = useState()
  const [gender, setgender] = useState("")
  const [randomint, setrandomint] = useState(Math.floor(Math.random() * 10))
  const [email, setemail] = useState(`example@7%.com`)

  const changeInt = () => {
    setrandomint(Math.floor(Math.random() * 1000))
    setemail(`example@${randomint}.com`)
  }

  const handleSignup = () => {
    changeInt();

    let formdata = new FormData();
    formdata.append("name", username);
    formdata.append("phone", phone);
    formdata.append("password", password);
    formdata.append("birthday", birthday);
    formdata.append("gender", gender);
    formdata.append("email", email);

    dispatch(SignUp(formdata))
      .then((res) => {
        if (res.type === "signup/fulfilled") {
          setusername("")
          setphone(0)
          setsmsCode(0)
          setpassword("")
          setbirthday()
          setgender("")
          changeInt()
          navigate("/login")
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="w-full">
        <div className="pt-10 pb-4 w-full sm:w-[80%] md:w-[90%] lg:w-[70%] mx-auto">
          <div className="flex justify-between flex-wrap items-center mb-3">
            <h2 className="text-lg font-semibold sm:text-xl">
              Create your ShopHub Account
            </h2>
            <div className="flex items-center text-sm">
              <p>
                Already member?{" "}
                <Link to={"/login"} className="text-blue-600">
                  Login
                </Link>{" "}
                here.
              </p>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="left w-full md:w-1/2">
                <div>
                  <div className="py-1 text-sm font-semibold">
                    <label htmlFor="phone">Phone Number*</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      id="phone"
                      placeholder="Please enter your phone number..."
                      className="outline-none w-full text-sm py-2 px-2 pe-10 border border-gray-300"
                    />
                    <i className="fa-solid fa-close text-sm border border-gray-300 py-[1px] px-[5px] rounded-full text-white bg-gray-300 cursor-pointer absolute right-3 top-2"></i>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="py-1 text-sm font-semibold">
                    <label htmlFor="sms">SMS Verification Code*</label>
                  </div>
                  <input
                    type="number"
                    name="sms"
                    value={smsCode}
                    onChange={(e) => setsmsCode(e.target.value)}
                    id="sms"
                    placeholder="6 digits"
                    className="outline-none w-full py-2 px-2 text-sm border border-gray-300"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="password" className="text-sm font-semibold">
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      id="password"
                      placeholder="Minimum 6 characters with a number and latter"
                      className="outline-none w-full py-2 px-2 pe-20 border border-gray-300 text-sm"
                    />
                    <div className="flex items-center gap-2 absolute right-3 top-[2px]">
                      <i className="fa-solid fa-close text-sm border border-gray-300 py-[1px] px-[5px] rounded-full text-white bg-gray-300 cursor-pointer"></i>
                      <i className="fa-solid fa-eye py-1 px-1.5 rounded-full text-gray-400 text-lg cursor-pointer"></i>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div>
                    <div className="py-1 text-sm font-semibold">
                      <label htmlFor="day">Birthday*</label>
                    </div>
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) => setbirthday(e.target.value)}
                      name="day"
                      id="day"
                      className="outline-none w-full py-2 px-2 text-sm border border-gray-300"
                    />
                  </div>
                  <div>
                    <div className="py-1 text-sm font-semibold">
                      <label htmlFor="gender">Gender*</label>
                    </div>
                    <select
                      name="gender"
                      id="gender"
                      onChange={(e) => setgender(e.target.value)}
                      className="outline-none w-full py-2 px-2 text-sm border border-gray-300"
                    >
                      <option>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="right w-full md:w-1/2">
                <div>
                  <div className="py-1 text-sm font-semibold">
                    <label htmlFor="name">Full Name*</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                      id="name"
                      placeholder="First Last"
                      className="outline-none w-full py-2 px-2 pe-10 text-sm border border-gray-300"
                    />
                    <i className="fa-solid fa-close text-sm border border-gray-300 py-[1px] px-[5px] rounded-full text-white bg-gray-300 cursor-pointer absolute right-3 top-2"></i>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-xs gap-3">
                  <input type="checkbox" className="" />
                  <p>
                    I'd like to receive exclusive offers and promotions via SMS
                  </p>
                </div>
                <button
                  onClick={handleSignup}
                  type="submit"
                  className="text-white bg-site-color hover:bg-orange-500 py-3 w-full text-base mt-6"
                >
                  {loader ? "Loading..." : "SIGN UP"}
                </button>
                <div className="mt-4">
                  <p className="text-xs">
                    By clicking "SIGN UP" I agree to{" "}
                    <Link to={"/"} className="text-blue-600 hover:underline">
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link to={"/"} className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
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
      </div>
    </>
  );
}

export default Signup;
