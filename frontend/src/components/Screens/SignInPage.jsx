import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-[#f4f5f7]">
      <div className="flex flex-col md:flex-row items-center max-w-screen-xl mx-auto">
        {/* Left Section: Image */}
        <div className="relative w-full md:w-1/2 h-80 md:h-auto bg-gray-200">
          <img
            src="/images/signimg.jpg"
            alt="Sign In"
            className="w-full h-[660px] object-cover"
          />
        </div>

        {/* Right Section: Sign In Form */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 md:py-16">
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <p className="mb-6">
            Don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="text-[#38cb89] no-underline hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <form>
            {/* Email Field */}
            <div className="mb-6">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none bg-[#f4f5f7]"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none bg-[#f4f5f7]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Checkbox */}
            <div className="mb-8 flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                Remember Me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
