const mongoose = require("mongoose");

// Cart Schema
const cartSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the user who owns the cart
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product", // Reference to the product added to the cart
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Default quantity for each product in the cart
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0, // Default total price starts at 0
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Modeling the cart's schema
module.exports = mongoose.model("Cart", cartSchema);
