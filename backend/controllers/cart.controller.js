const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// @desc Retrieve the current user's cart
// @route GET /api/cart
// @access Private
const retrieveUserCart = asyncHandler(async (req, res) => {
  // Find the user's cart by their user_id
  const cart = await Cart.findOne({ user_id: req.user.id }).populate("items.product_id", "name price");
  
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Return the user's cart
  res.status(200).json(cart);
});

// @desc Add an item to the cart
// @route POST /api/cart
// @access Private
const addItemToCart = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body;

  // Validate input
  if (!product_id || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  // Check if the product exists
  const product = await Product.findById(product_id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Find the user's cart
  let cart = await Cart.findOne({ user_id: req.user.id });

  // If the cart does not exist, create a new cart
  if (!cart) {
    cart = new Cart({
      user_id: req.user.id,
      items: [{ product_id, quantity }],
      totalPrice: product.price * quantity,
    });
  } else {
    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex((item) => item.product_id.toString() === product_id);

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add the new product to the cart
      cart.items.push({ product_id, quantity });
    }

    // Recalculate the total price of the cart
    cart.totalPrice += product.price * quantity;
  }

  // Save the updated cart
  await cart.save();

  res.status(201).json({ message: "Item added to cart", cart });
});
// @desc Remove an item from the cart
// @route DELETE /api/cart/:id
// @access Private
const removeItemFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user's cart
  const cart = await Cart.findOne({ user_id: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Find the product in the cart
  const itemIndex = cart.items.findIndex((item) => item.product_id.toString() === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  // Get the price of the product to update the total price
  const product = await Product.findById(id);

  // Remove the product from the cart
  cart.totalPrice -= product.price * cart.items[itemIndex].quantity;
  cart.items.splice(itemIndex, 1);

  // Save the updated cart
  await cart.save();

  res.status(200).json({ message: "Item removed from cart", cart });
});

module.exports = {
  retrieveUserCart,
  addItemToCart,
  removeItemFromCart,
};
