import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import NewsLetter from "./commons/NewsLetter";

const ProductPage = () => {
  // Sample product data
  const product = {
    name: "Product Name",
    description: "This is a detailed description of the product.",
    price: "$150",
    rating: 4.5,
    reviewCount: 100,
    category: "Home Decor", // Example category
    images: [
      "/images/product/product1.jpg",
      "/images/product/product2.jpg",
      "/images/product/product3.jpg",
      "/images/product/product4.jpg",
      "/images/product/product5.jpg",
      "/images/product/product6.jpg",
    ],
  };

  const [quantity, setQuantity] = useState(1);
  const [slide, setSlide] = useState(0);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const nextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide >= Math.ceil(productItems.length / 2) - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide <= 0 ? Math.ceil(productItems.length / 2) - 1 : prevSlide - 1
    );
  };

  // Carousel for product items (new section)
  const productItems = [
    {
      img: "/images/home/product1.jpg",
      name: "Product 1",
      price: "$50",
      rating: 4,
    },
    {
      img: "/images/home/product2.jpg",
      name: "Product 2",
      price: "$65",
      rating: 5,
    },
    {
      img: "/images/home/product3.jpg",
      name: "Product 3",
      price: "$80",
      rating: 3,
    },
    {
      img: "/images/home/product4.jpg",
      name: "Product 4",
      price: "$95",
      rating: 4,
    },
    {
      img: "/images/home/product5.jpg",
      name: "Product 5",
      price: "$70",
      rating: 5,
    },
    {
      img: "/images/home/product6.jpg",
      name: "Product 6",
      price: "$70",
      rating: 3.4,
    },
    {
      img: "/images/home/product7.jpg",
      name: "Product 7",
      price: "$70",
      rating: 2,
    },
  ];

  return (
    <>
      <div className="max-w-screen-lg mx-auto my-12 flex flex-col">
        {/* Product Images Section */}
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Product Images */}
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

          {/* Right Section: Product Details */}
          <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
            {/* Reviews */}
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

            {/* Product Name */}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Product Description */}
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Product Price */}
            <p className="text-2xl font-bold mb-6">{product.price}</p>

            <hr className="my-6" />

            {/* Quantity Selector */}
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

            {/* Add to Cart Button */}
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
              Add to Cart
            </button>

            {/* Category Section */}
            <div className="mt-6">
              <p className="text-gray-600">
                <span className="font-semibold">Category: </span>
                {product.category}
              </p>
            </div>
          </div>
        </div>

        {/* You might also like Carousel Section */}
        <section className="w-full max-w-screen-xl p-8 mt-12 relative">
          <div className="flex items-center justify-between mb-6">
            {/* Heading */}
            <h2 className="text-3xl font-semibold">New Arrivals</h2>
            {/* Shop Now Link */}
            <a href="#" className="text-black underline flex items-center">
              More Products <span className="ml-1">→</span>
            </a>
          </div>

          <div className="relative flex overflow-hidden">
            {/* Carousel items */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${slide * (100 / 2)}%)`,
                width: `${productItems.length * 50}%`,
              }}
            >
              {productItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded-lg shadow-lg flex-shrink-0 w-[250px] relative hover:shadow-xl mr-8" // Increased margin here
                >
                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                  />

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Name */}
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    {/* Price */}
                    <p className="text-gray-700">{item.price}</p>
                    {/* Rating */}
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

                  {/* Add to Cart button (on hover) */}
                  <div className="absolute inset-0 flex rounded-md items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-75 text-white transition-opacity opacity-0 hover:opacity-100">
                    <button className="bg-black px-4 py-2 rounded-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Left and Right Arrows */}
            <BsArrowLeftCircleFill
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-black cursor-pointer z-10 ml-4"
            />
            <BsArrowRightCircleFill
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-black cursor-pointer z-10 mr-4"
            />
          </div>
        </section>
      </div>

      <NewsLetter />
    </>
  );
};

export default ProductPage;
