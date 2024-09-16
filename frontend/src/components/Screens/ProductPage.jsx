import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import NewsLetter from "./commons/NewsLetter";
import { useParams } from "react-router-dom"; // Import useParams to get productId from URL
import { Link } from "react-router-dom";

const ProductPage = () => {
  const { productId } = useParams(); // Get productId from URL params
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [slide, setSlide] = useState(0);
  const [productItems, setProductItems] = useState([]); // State for product items

  // Fetch product details when component mounts or productId changes
  useEffect(() => {
    console.log("ProductId:", productId); // Log the productId to check its value

    const fetchProduct = async () => {
      try {
        if (!productId) {
          console.error("ProductId is undefined");
          return;
        }

        const response = await fetch(
          `http://localhost:9000/api/products/${productId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error(`Failed to fetch product. Status: ${response.status}`);
          const errorText = await response.text();
          console.error(`Error details: ${errorText}`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

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

  const handleAddToCart = async () => {
    // getting the token from local storage/session storage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:9000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity }),
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

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

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

  if (!product) return <p>Loading...</p>; // Display loading state while fetching

  return (
    <>
      <div className="max-w-screen-lg mx-auto my-12 flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product Image ${index + 1}`}
                className={`w-full h-full object-cover ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              />
            ))}
          </div>

          <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 flex">
                {[...Array(Math.floor(product.rating))].map((_, i) => (
                  <FaStar key={i} />
                ))}
                {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                  <FaRegStar key={i} />
                ))}
              </span>
              <p className="text-gray-600 ml-2">
                {product.rating} / 5 ({product.reviewCount} reviews)
              </p>
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <p className="text-gray-600 mb-4">{product.description}</p>

            <p className="text-2xl font-bold mb-6">₹{product.price}</p>

            <hr className="my-6" />

            <div className="flex items-center mb-6">
              <button
                className="px-4 py-2 border"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <p className="px-4">{quantity}</p>
              <button
                className="px-4 py-2 border"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>

            <div className="mt-6">
              <p className="text-gray-600">
                <span className="font-semibold">Category: </span>
                {product.category}
              </p>
            </div>
          </div>
        </div>

        <section className="w-full max-w-screen-xl p-8 mt-12 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">New Arrivals</h2>
            <a href="#" className="text-black underline flex items-center">
              More Products <span className="ml-1">→</span>
            </a>
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
      </div>

      <NewsLetter />
    </>
  );
};

export default ProductPage;
