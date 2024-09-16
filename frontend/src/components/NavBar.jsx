import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const location = useLocation();
  const userRole = localStorage.getItem("role") || sessionStorage.getItem("role"); // role is stored in localStorage

  // Determine if we are in the admin section
  const isAdminSection = location.pathname.startsWith("/admin");

  useEffect(() => {
    const fetchUserInfo = async () => {
      // getting the token from local storage/session storage
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:9000/api/users/current",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // token for authentication
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser({ name: data.name, email: data.email });
        } else {
          // Handle case where user is not logged in or token is invalid
          setUser({ name: "", email: "" });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUser({ name: "", email: "" });
      }
    };

    fetchUserInfo();
  }, []);

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
          {/* Show different links based on the section */}
          {!isAdminSection ? (
            <>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
              <Link to="/shop" className="hover:text-gray-600">
                Shop
              </Link>
              {/* <Link to="/contact" className="hover:text-gray-600">
                Contact Us
              </Link> */}
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
              <Link to="/admin/Dashboard" className="hover:text-gray-600">
                Dashboard
              </Link>
              <Link to="/admin/Users" className="hover:text-gray-600">
                Users
              </Link>
              <Link to="/admin/Products" className="hover:text-gray-600">
                Products
              </Link>
            </>
          )}

          {/* Conditionally render Admin link */}
          {userRole === "admin" && !isAdminSection && (
            <Link to="/admin/Dashboard" className="hover:text-gray-600">
              Admin
            </Link>
          )}
        </div>

        {/* Right Navbar */}
        <div className="relative flex items-center space-x-4">
          <HiSearch className="text-xl cursor-pointer" />
          <Link to="/cart">
            <FaShoppingCart className="text-xl cursor-pointer" />
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setShowUserInfo(true)}
            onMouseLeave={() => setShowUserInfo(false)}
          >
            <Link to={"/signin"}>
              <FaUser className="text-xl cursor-pointer" />
              {showUserInfo && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-10">
                  {user.name && user.email ? (
                    <>
                      <h3 className="text-lg font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No User is logged in!
                    </p>
                  )}
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
