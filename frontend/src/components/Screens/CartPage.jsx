import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState("free");
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:9000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items || []);
        } else {
          console.error("Error fetching cart:", response.statusText);
          setCartItems([]); // Handle error by setting an empty array
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]); // Handle network error by setting an empty array
      }
    };

    fetchCart();
  }, []);

  // const handleQuantityChange = async (productId, delta) => {
  //   const item = cartItems.find((item) => item.product_id._id === productId);
  //   const newQuantity = Math.max(1, (item?.quantity || 1) + delta);
  //   try {
  //     const token =
  //       localStorage.getItem("token") || sessionStorage.getItem("token");
  //     const response = await fetch(`http://localhost:9000/api/cart/${productId}`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ quantity: newQuantity }),
  //     });

  //     if (response.ok) {
  //       setCartItems((items) =>
  //         items.map((item) =>
  //           item.product_id._id === productId ? { ...item, quantity: newQuantity } : item
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };
  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = async (productId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:9000/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setCartItems((items) =>
          items.filter((item) => item.product_id._id !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };

  const getSubtotal = (item) =>
    (item.product_id.price || 0) * (item.quantity || 1);
  const getTotal = () => {
    const productTotal = cartItems.reduce(
      (acc, item) => acc + getSubtotal(item),
      0
    );
    const shippingCost =
      shipping === "express" ? 400 : shipping === "pickup" ? 200 : 0;
    return productTotal + shippingCost;
  };

  const handleCouponApply = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:9000/api/coupons/${couponCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Assuming data contains discount information
        console.log("Coupon applied:", data);
        // Implement discount application logic here
      } else {
        console.error("Invalid coupon code");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto py-12">
      <h1 className="text-center text-3xl font-bold mb-8">Cart</h1>

      <div className="flex flex-col md:flex-row">
        {/* Left Section: Cart Table */}
        <div className="w-full md:w-2/3 pr-6">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-10 gap-8 mb-8 font-bold border-b border-gray-300 pb-2">
                <p className="col-span-4">Product</p>
                <p className="col-span-2 text-center">Quantity</p>
                <p className="col-span-1 text-center">Price</p>
                <p className="col-span-1 text-center">Subtotal</p>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-center text-xl font-semibold">
                  Add items to cart!
                </p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product_id._id}>
                    <div className="grid grid-cols-10 gap-8 items-center mb-6">
                      <div className="col-span-4 flex items-center">
                        <img
                          src={item.product_id.img || "/default-image.png"} // Ensure default image if missing
                          alt={item.product_id.name}
                          className="w-16 h-16 object-cover rounded mr-6"
                        />
                        <div>
                          <h3 className="font-semibold">
                            {item.product_id.name}
                          </h3>
                          <button
                            onClick={() => handleRemove(item.product_id._id)}
                            className="text-black text-sm flex items-center mt-2"
                          >
                            <FaTimes className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-center items-center">
                        {/* <button
                          onClick={() => handleQuantityChange(item.product_id._id, -1)}
                          className="px-2 py-1 border"
                        >
                          <FaMinus />
                        </button> */}
                        <p className="px-4">{item.quantity || 1}</p>
                        {/* <button
                          onClick={() => handleQuantityChange(item.product_id._id, 1)}
                          className="px-2 py-1 border"
                        >
                          <FaPlus />
                        </button> */}
                      </div>

                      <p className="col-span-1 text-center">
                        ₹{(item.product_id.price || 0).toFixed(2)}
                      </p>

                      <p className="col-span-1 font-bold text-center">
                        ₹{getSubtotal(item).toFixed(2)}
                      </p>
                    </div>
                    <hr className="mb-6 border-gray-300" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Cart Summary */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <div className="border p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

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
                  <span className="ml-auto">₹0.00</span>
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
                  <span className="ml-auto">+₹400.00</span>
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
                  <span className="ml-auto">+₹200.00</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Coupon Code</label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button
                onClick={handleCouponApply}
                className="mt-2 w-full bg-green-500 text-white p-2 rounded"
              >
                Apply Coupon
              </button>
            </div>

            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-500 text-white p-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
