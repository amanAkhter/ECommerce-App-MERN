import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import NewsLetter from "./commons/NewsLetter";

function ShopPage() {
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
    {
      img: "/images/home/product5.jpg",
      name: "Product 8",
      price: "$60",
      rating: 4.5,
    },
    {
      img: "/images/home/product5.jpg",
      name: "Product 9",
      price: "$40",
      rating: 3.8,
    },
    {
      img: "/images/home/product5.jpg",
      name: "Product 10",
      price: "$30",
      rating: 4,
    },
    {
      img: "/images/home/product5.jpg",
      name: "Product 11",
      price: "$25",
      rating: 4.3,
    },
    {
      img: "/images/home/product5.jpg",
      name: "Product 12",
      price: "$90",
      rating: 5,
    },
  ];

  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleShowMore = () => {
    setVisibleProducts((prevCount) => prevCount + 4); // Load 4 more products each time
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
          <div className="absolute inset-0" />
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
            {productItems.slice(0, visibleProducts).map((item, index) => (
              <div
                key={index}
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
                  <p className="mt-2 text-xl font-medium">{item.price}</p>
                </div>

                {/* Add to Cart button, hidden by default and shown on hover */}
                <button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-black text-white font-medium rounded hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Add to Cart
                </button>
                {/* Add to Cart button (on hover) */}
                {/* <div className="absolute inset-0 flex rounded-md items-center justify-center bg-zinc-800 bg-opacity-0 hover:bg-opacity-75 text-white transition-opacity opacity-0 hover:opacity-100">
                  <button className="bg-black px-4 py-2 rounded-md">
                    Add to Cart
                  </button>
                </div> */}
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
