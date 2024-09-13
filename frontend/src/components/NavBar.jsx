import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex flex-col items-center">
      {/* Navbar */}
      <nav className="flex items-center justify-between pt-8 w-full max-w-screen-xl mb-4">
        {/* Left Navbar */}
        <div className="text-2xl font-bold">
          <Link to="/">3legant</Link>
        </div>

        {/* Mid Navbar */}
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link to="/shop" className="hover:text-gray-600">
            Shop
          </Link>
          <Link to="/product" className="hover:text-gray-600">
            Product
          </Link>
          <Link to="/contact" className="hover:text-gray-600">
            Contact Us
          </Link>
        </div>

        {/* Right Navbar */}
        <div className="flex items-center space-x-4">
          <HiSearch className="text-xl cursor-pointer" />
          <Link to="/cart">
            <FaShoppingCart className="text-xl cursor-pointer" />
          </Link>
          <Link to="/signin">
            <FaUser className="text-xl cursor-pointer" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
