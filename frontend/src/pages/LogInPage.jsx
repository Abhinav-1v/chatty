import React, { useState } from "react";
import { Useauthstore } from "../store/useauthstore";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import {Link} from 'react-router-dom';

const LogInPage = () => {
  const [showpw, setshowpw] = useState(false);
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const { loginfun, isLoggingin } = Useauthstore();
  
  const validateform = () => {
    if(!formdata.email)return  toast.error('Email is required!');
    if(formdata.password.length<1) return toast.error('Please Enter Password!');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  
    if(!emailRegex.test(formdata.email)) return toast.error('Invalid Email!');
    
    return true;
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    const success=validateform();
    if(success===true){
      loginfun(formdata);
    }
  };
  function togglePasswordVisibility() {
    setshowpw(!showpw);
  }

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center px-6 py-8">
        <svg
          width="120px"
          height="120px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          className="mb-6"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              opacity="0.5"
              d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 13.7596 1.41318 15.4228 2.14781 16.8977C2.34303 17.2897 2.40801 17.7377 2.29483 18.1607L1.63966 20.6093C1.35525 21.6723 2.32772 22.6447 3.39068 22.3603L5.83932 21.7052C6.26233 21.592 6.71033 21.657 7.10228 21.8522C8.5772 22.5868 10.2404 23 12 23Z"
              fill="#e81cff"
            ></path>{" "}
            <path
              d="M10.9 12.0004C10.9 12.6079 11.3925 13.1004 12 13.1004C12.6075 13.1004 13.1 12.6079 13.1 12.0004C13.1 11.3929 12.6075 10.9004 12 10.9004C11.3925 10.9004 10.9 11.3929 10.9 12.0004Z"
              fill="#e81cff"
            ></path>{" "}
            <path
              d="M6.5 12.0004C6.5 12.6079 6.99249 13.1004 7.6 13.1004C8.20751 13.1004 8.7 12.6079 8.7 12.0004C8.7 11.3929 8.20751 10.9004 7.6 10.9004C6.99249 10.9004 6.5 11.3929 6.5 12.0004Z"
              fill="#e81cff"
            ></path>{" "}
            <path
              d="M15.3 12.0004C15.3 12.6079 15.7925 13.1004 16.4 13.1004C17.0075 13.1004 17.5 12.6079 17.5 12.0004C17.5 11.3929 17.0075 10.9004 16.4 10.9004C15.7925 10.9004 15.3 11.3929 15.3 12.0004Z"
              fill="#e81cff"
            ></path>{" "}
          </g>
        </svg>
        <h1 className="text-3xl font-bold mb-8 ">
          Login!
        </h1>
        <div className="flex justify-center items-center flex-col gap-6 w-full max-w-md">
          {/* Email Input */}
          <label className="input input-bordered hover:border-purple-400 focus-within:border-purple-500 flex items-center gap-2 px-4 py-3 rounded-lg w-full bg-gray-50 border-2 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="grow focus:outline-none bg-transparent"
              onChange={(e)=>setformdata({...formdata,email:e.target.value})}
              value={formdata.email}
            />
          </label>
          {/* Password Input */}
          <label className="input input-bordered hover:border-purple-400 focus-within:border-purple-500 flex items-center gap-2 px-4 py-3 rounded-lg w-full bg-gray-50 border-2 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={showpw ? "text" : "password"}
              placeholder="Password"
              className="grow focus:outline-none bg-transparent"
              name="password"
              value={formdata.password}
              onChange={(e)=>setformdata({...formdata,password:e.target.value})}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
            >
              {!showpw ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#666666"
                >
                  <path
                    d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </label>

          {/* Submit Button */}
          <button
            onClick={handlesubmit}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-[0.99] active:scale-[0.97]"
          >
            {isLoggingin ? "Logging In..." : "Login"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Dont have an Account? {" "}
            <Link to='/signup' className="link text-purple-600 hover:text-purple-500 font-medium">Create Account</Link>
          </p>
        </div>
      </div>
      <AuthImagePattern 
      title={'Join our community'} 
      subtitle={"Connect with friends, share moments, and stay in touch with your loved ones."}  />
    </div>
  );
};

export default LogInPage;
