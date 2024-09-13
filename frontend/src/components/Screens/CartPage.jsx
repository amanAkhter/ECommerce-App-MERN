import React, { useState } from "react";
import { FaMinus, FaPlus, FaTimes, FaTicketAlt } from "react-icons/fa"; // Importing the coupon icon

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 50,
      quantity: 1,
      img: "/images/product/product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 80,
      quantity: 2,
      img: "/images/product/product2.jpg",
    },
  ]);
  const [shipping, setShipping] = useState("free");
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };

  const getSubtotal = (item) => item.price * item.quantity;
  const getTotal = () => {
    const productTotal = cartItems.reduce(
      (acc, item) => acc + getSubtotal(item),
      0
    );
    const shippingCost =
      shipping === "express" ? 15 : shipping === "pickup" ? 21 : 0;
    return productTotal + shippingCost;
  };

  const handleCouponApply = () => {
    // Logic for applying the coupon can be added here
    console.log("Coupon applied:", couponCode);
  };

  return (
    <div className="max-w-screen-xl mx-auto py-12"> 
      {/* Page Heading */}
      <h1 className="text-center text-3xl font-bold mb-8">Cart</h1>

      <div className="flex flex-col md:flex-row">
        {/* Left Section: Cart Table */}
        <div className="w-full md:w-2/3 pr-6"> 
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Headings with a bottom border and margin below */}
              <div className="grid grid-cols-10 gap-8 mb-8 font-bold border-b border-gray-300 pb-2">
                <p className="col-span-4">Product</p> 
                <p className="col-span-2 text-center">Quantity</p> 
                <p className="col-span-1 text-center">Price</p> 
                <p className="col-span-1 text-center">Subtotal</p> 
              </div>

              {/* Product Rows */}
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className="grid grid-cols-10 gap-8 items-center mb-6">
                    {/* Product */}
                    <div className="col-span-4 flex items-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-6"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-black text-sm flex items-center mt-2"
                        >
                          <FaTimes className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 border"
                      >
                        <FaMinus />
                      </button>
                      <p className="px-4">{item.quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 border"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="col-span-1 text-center">${item.price.toFixed(2)}</p>

                    {/* Subtotal */}
                    <p className="col-span-1 font-bold text-center">${getSubtotal(item).toFixed(2)}</p>
                  </div>
                  <hr className="mb-6 border-gray-300" /> 
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Cart Summary */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0"> 
          <div className="border p-8 rounded-lg"> 
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

            {/* Shipping Options */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Shipping</label>
              <div className="flex flex-col">
                <label className="flex justify-between items-center mb-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="free"
                    checked={shipping === "free"}
                    onChange={handleShippingChange}
                    className="mr-2"
                  />
                  Free Shipping
                  <span className="ml-auto">$0.00</span>
                </label>
                <label className="flex justify-between items-center mb-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shipping === "express"}
                    onChange={handleShippingChange}
                    className="mr-2"
                  />
                  Express Shipping
                  <span className="ml-auto">+$15.00</span>
                </label>
                <label className="flex justify-between items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value="pickup"
                    checked={shipping === "pickup"}
                    onChange={handleShippingChange}
                    className="mr-2"
                  />
                  Pickup
                  <span className="ml-auto">+$21.00</span>
                </label>
              </div>
            </div>

            {/* Subtotal and Total */}
            <div className="mb-4">
              <div className="flex justify-between mb-2 font-bold">
                <p>Subtotal:</p>
                <p>${cartItems.reduce((acc, item) => acc + getSubtotal(item), 0).toFixed(2)}</p>
              </div>
              <hr className="mb-4" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total:</p>
                <p>${getTotal().toFixed(2)}</p>
              </div>
            </div>

            <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mt-12 p-8 rounded-lg border"> 
        <h2 className="text-xl font-bold mb-2">Have the Coupon?</h2>
        <p className="mb-4">Add your code for an instant cart discount</p>

        <div className="flex items-center border rounded-lg p-2">
          <FaTicketAlt className="text-gray-500 mr-2" /> 
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 px-2 py-1 text-gray-700 focus:outline-none"
          />
          <button
            onClick={handleCouponApply}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
