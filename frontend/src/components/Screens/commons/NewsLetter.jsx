import React from "react";
import { HiMail } from "react-icons/hi";

function NewsLetter() {
  return (
    <div>
      {/* Newsletter Section */}
      <section className="relative w-full h-[500px] mt-12">
        {/* Background Image */}
        <img
          src="/images/home/newsletter.png" // Replace with your actual image path
          alt="Newsletter Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay for text visibility */}
        <div className="absolute inset-0"></div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-3xl font-medium mb-4">Join our Newsletter</h2>
          <p className="text-lg mb-8">
            Sign up for deals, new products and promotions
          </p>

          {/* Input Field */}
          <form className="flex items-center w-full max-w-lg mx-auto">
            <div className="relative w-full">
              <span className="absolute left-3 top-3.5 text-gray-500">
                <HiMail />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-3 pl-10 pr-32 rounded-full focus:outline-none text-black"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewsLetter;
