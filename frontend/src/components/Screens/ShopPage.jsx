import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import NewsLetter from "./commons/NewsLetter";
import { Link } from "react-router-dom";

function ShopPage() {
  const [productItems, setProductItems] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/products");
        if (response.ok) {
          const products = await response.json();
          setProductItems(products);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleShowMore = () => {
    setVisibleProducts((prevCount) => prevCount + 4); // Load 4 more products each time
  };

  const handleAddToCart = async (productId) => {
    // getting the token from local storage/session storage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:9000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // token retrieval
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      if (response.ok) {
        alert("Item added to cart");
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Banner Section */}
        <section className="relative bg-no-repeat bg-center bg-cover h-[500px] w-full">
          <img
            src="/images/shop/banner.jpg"
            alt="Shop Banner"
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-medium mb-4">
                <span className="text-3xl text-gray-500">Home &gt;</span> Shop
              </h2>
              <h1 className="text-5xl font-medium mb-4">Shop Page</h1>
              <p className="text-lg">
                Let's design the place you always imagined
              </p>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-screen-xl w-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-12">
            {productItems.slice(0, visibleProducts).map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg p-4 h-full relative group"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 flex">
                      {[...Array(Math.floor(item.rating))].map((_, i) => (
                        <FaStar key={i} className="mx-1" />
                      ))}
                      {[...Array(5 - Math.floor(item.rating))].map((_, i) => (
                        <FaRegStar key={i} className="mx-1" />
                      ))}
                    </span>
                    <p className="text-gray-500 text-sm ml-2">
                      {item.rating} / 5
                    </p>
                  </div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="mt-2 text-xl font-medium">₹{item.price}</p>
                </div>

                {/* Hover Add to Cart Button */}
                <div className="absolute inset-0 flex flex-col rounded-md items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 text-white transition-opacity opacity-0 hover:opacity-100">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="bg-black px-4 py-2 my-4 rounded-md"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${item._id}`}
                    className="bg-black px-4 py-2 my-4 rounded-md"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {visibleProducts < productItems.length && (
            <div className="text-center mt-8">
              <button
                className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </section>
      </div>
      <NewsLetter />
    </>
  );
}

export default ShopPage;
