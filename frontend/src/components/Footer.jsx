import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#141718] text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Upper Section */}
          <div className="text-lg font-medium">
            3legant | Gift & Decoration Store
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>
            <Link to="/product" className="hover:underline">
              Product
            </Link>
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="flex justify-between items-center">
          {/* Lower Section */}
          <div className="text-sm flex space-x-4">
            <p className="mb-2">
              Copyright © 2023 3legant | All rights reserved
            </p>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="hover:underline">
              Terms of Use
            </Link>
          </div>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
