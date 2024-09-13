import React, { useState } from "react";
import { FaTruck, FaMoneyBillAlt, FaLock, FaPhone } from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import NewsLetter from "./commons/NewsLetter";

const HomePage = () => {
  const [slide, setSlide] = useState(0);

  // Carousel images data
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

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
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
      img: "/images/home/product5.jpg",
      name: "Product 6",
      price: "$70",
      rating: 3.4,
    },
    {
      img: "/images/home/product5.jpg",
      name: "Product 7",
      price: "$70",
      rating: 2,
    },
  ];

  return (
    <>
      <div className="">
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
                3legant is a gift & decorations store based in HCMC, Vietnam.
                Est since 2019.
              </p>
            </div>
          </section>

          {/* Product Cards Section */}
          <section className="flex flex-col md:flex-row w-full max-w-screen-xl p-8 space-y-8 md:space-y-0 md:space-x-8">
            {/* Left Card */}
            <div className="flex-1 flex flex-col-reverse items-start justify-start bg-gray-100 rounded-lg shadow-lg p-6">
              <img
                src="/images/home/living-room.jpg"
                alt="Living Room"
                className="w-88 h-88 object-cover rounded-lg mb-4"
              />
              <div className="flex flex-col pl-[20px]">
                <h2 className="text-xl font-medium mb-2 text-[30px]">
                  Living Room
                </h2>
                <a
                  href="#"
                  className="text-blue-500 underline flex items-center"
                >
                  Shop Now <span className="ml-1">→</span>
                </a>
              </div>
            </div>

            {/* Right Cards */}
            <div className="flex flex-col flex-1 space-y-8">
              {/* Bedroom Card */}
              <div className="bg-gray-100 h-fit rounded-lg shadow-lg flex flex-row-reverse items-center p-6">
                <img
                  src="/images/home/bedroom.jpg"
                  alt="Bedroom"
                  className="w-63 h-63 object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-medium mb-2 text-[30px] pr-[35px]">
                    Bedroom
                  </h2>
                  <a
                    href="#"
                    className="text-blue-500 underline flex items-center"
                  >
                    Shop Now <span className="ml-1">→</span>
                  </a>
                </div>
              </div>

              {/* Kitchen Card */}
              <div className="bg-gray-100 rounded-lg shadow-lg flex flex-row-reverse items-center p-6 h-fit">
                <img
                  src="/images/home/kitchen.jpg"
                  alt="Kitchen"
                  className="w-55 h-55 object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-medium mb-2 text-[30px] pr-[55px]">
                    Kitchen
                  </h2>
                  <a
                    href="#"
                    className="text-blue-500 underline flex items-center"
                  >
                    Shop Now <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* New Product Carousel Section */}
          <section className="w-full max-w-screen-xl p-8 mt-12">
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
                className="flex space-x-6 w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {productItems.map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 rounded-lg shadow-lg flex-shrink-0 w-[250px] relative hover:shadow-xl"
                  >
                    {/* Image */}
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-[200px] object-cover rounded-t-lg"
                    />

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Name */}
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      {/* Price */}
                      <p className="text-gray-700">{product.price}</p>
                      {/* Rating */}
                      <div className="flex items-center mt-2">
                        {Array(5)
                          .fill(0)
                          .map((_, starIdx) => (
                            <FaStar
                              key={starIdx}
                              className={`${
                                starIdx < product.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                      </div>
                    </div>

                    {/* Add to Cart button (on hover) */}
                    <div className="absolute inset-0 flex rounded-md items-center justify-center bg-slate-800 bg-opacity-0 hover:bg-opacity-75 text-white transition-opacity opacity-0 hover:opacity-100">
                      <button className="bg-black px-4 py-2 rounded-md">
                        Add to Cart
                      </button>
                    </div>
                    {/* Add to Cart button, hidden by default and shown on hover */}
                    {/* <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-black text-white font-medium rounded hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Add to Cart
                    </button> */}
                  </div>
                ))}
              </div>

              {/* Left and Right Arrows */}
              <BsArrowLeftCircleFill
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-black cursor-pointer z-10"
              />
              <BsArrowRightCircleFill
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-black cursor-pointer z-10"
              />
            </div>
          </section>

          {/* New Static Features Section */}
          <section className="w-full max-w-screen-xl p-8 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Shipping */}
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6 text-center">
              <FaTruck className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Order above $200</p>
            </div>

            {/* Money-Back */}
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6 text-center">
              <FaMoneyBillAlt className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Money-Back</h3>
              <p className="text-gray-600">30 days guarantee</p>
            </div>

            {/* Secure Payment */}
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6 text-center">
              <FaLock className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Secured by Stripe</p>
            </div>

            {/* 24/7 Support */}
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6 text-center">
              <FaPhone className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Phone and Email Support</p>
            </div>
          </section>

          {/* Sale Section */}
          <section className="w-full max-w-screen-xl p-8 mt-12 flex flex-col md:flex-row items-center">
            {/* Left Image */}
            <div className="flex-1">
              <img
                src="/images/home/sale-banner.jpg" // Replace this with your actual image
                alt="Sale Banner"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right Text Section */}
            <div className="flex-1 md:pl-12 text-center md:text-left mt-8 md:mt-0">
              <span className="uppercase text-red-600 text-lg font-bold">
                Sale! Up to 35% off
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-2">
                HUNDREDS of <br /> New lower prices!
              </h1>
              <p className="text-gray-600 text-lg mt-4">
                It’s more affordable than ever to give every room in your home a
                stylish makeover.
              </p>
              <a
                href="#"
                className="text-black underline text-lg font-medium mt-4 inline-block"
              >
                Shop Now →
              </a>
            </div>
          </section>
        </main>
      </div>
      <NewsLetter />
    </>
  );
};

export default HomePage;
