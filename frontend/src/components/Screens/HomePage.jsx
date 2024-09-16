import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import NewsLetter from "./commons/NewsLetter";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [slide, setSlide] = useState(0);
  const [productItems, setProductItems] = useState([]); // State for product items

  // Banner Carousel images data
  const data = [
    {
      src: "/images/home/home-img-1.jpg",
      alt: "Image 1 for carousel",
    },
    {
      src: "/images/home/home-img-1.jpg",
      alt: "Image 2 for carousel",
    },
    {
      src: "/images/home/home-img-1.jpg",
      alt: "Image 3 for carousel",
    },
  ];

  const handleAddToCart = async (productId, quantity = 1) => {
    // getting the token from local storage/session storage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:9000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity }), // Ensure the correct product_id and quantity are sent
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

  // Fetch product items for the carousel
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/products"); // Adjust URL as necessary
        if (response.ok) {
          const products = await response.json();
          setProductItems(products); // Assuming the response is an array of product objects
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === productItems.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? productItems.length - 1 : prevSlide - 1
    );
  };

  return (
    <>
      {/* Banner Carousel */}
      <main className="flex flex-col items-center w-full">
        <div className="relative flex justify-center items-center w-full max-w-[1000px] h-[700px] overflow-hidden">
          <BsArrowLeftCircleFill
            onClick={prevSlide}
            className="absolute drop-shadow-md text-white text-3xl z-10 left-4 cursor-pointer"
            aria-label="Previous Slide"
          />
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {data.map((item, idx) => (
              <img
                src={item.src}
                alt={item.alt}
                key={idx}
                className="rounded-lg shadow-md w-full h-full flex-shrink-0"
              />
            ))}
          </div>
          <BsArrowRightCircleFill
            onClick={nextSlide}
            className="absolute drop-shadow-md text-white text-3xl z-10 right-4 cursor-pointer"
            aria-label="Next Slide"
          />
          <span className="absolute bottom-4 flex z-10">
            {data.map((_, idx) => (
              <button
                key={idx}
                className={`h-3 w-3 rounded-full border-none outline-none mx-1 cursor-pointer ${
                  slide === idx ? "bg-gray-500" : "bg-gray-300"
                }`}
                onClick={() => setSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </span>
        </div>

        {/* Section 2 */}
        <section className="flex flex-col md:flex-row items-center justify-between p-8 w-full max-w-screen-xl mt-12">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-[50px] font-medium leading-tight">
              Simply Unique /<br /> Simply Better.
            </h1>
          </div>
          <div className="text-center md:text-right">
            <p className="text-lg">
              3legant is a gift & decorations store based in HCMC, Vietnam. Est
              since 2019.
            </p>
          </div>
        </section>
        {/* Carousel Section */}
        <section className="w-full max-w-screen-xl p-8 mt-12 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">New Arrivals</h2>
            <Link to="/shop" className="text-black underline flex items-center">
              More Products <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="relative flex overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${slide * 100}%)`,
                width: `${productItems.length * 250}px`, // Adjust width based on number of items
              }}
            >
              {productItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-100 rounded-lg shadow-lg flex-shrink-0 w-[250px] relative hover:shadow-xl mr-8"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                  />

                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-700">₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      {Array(5)
                        .fill(0)
                        .map((_, starIdx) => (
                          <FaStar
                            key={starIdx}
                            className={`${
                              starIdx < item.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 flex flex-col rounded-md items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 text-white transition-opacity opacity-0 hover:opacity-100">
                    <Link
                      to={`/product/${item._id}`}
                      className="bg-black px-4 py-2 my-4 rounded-md"
                    >
                      View Product
                    </Link>
                    <button
                      className="bg-black px-4 py-2 my-4 rounded-md"
                      onClick={() => handleAddToCart(item._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <BsArrowLeftCircleFill
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-black cursor-pointer z-10 ml-4"
              aria-label="Previous Slide"
            />
            <BsArrowRightCircleFill
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-black cursor-pointer z-10 mr-4"
              aria-label="Next Slide"
            />
          </div>
        </section>

        {/* Static Features Section */}
        <section className="p-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-500 text-xl">🚚</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Free Shipping</h4>
                <p className="text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-500 text-xl">💵</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Money-Back Guarantee</h4>
                <p className="text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-yellow-500 text-xl">🔒</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Secure Payment</h4>
                <p className="text-gray-600">Encrypted transactions</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-500 text-xl">📞</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold">24/7 Support</h4>
                <p className="text-gray-600">Dedicated customer service</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <NewsLetter />
    </>
  );
};

export default HomePage;
