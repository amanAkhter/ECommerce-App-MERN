const mongoose = require("mongoose");

// Product Schema
const productSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the user who added/owns the product (admin)
    },
    name: {
      type: String,
      required: [true, "Please add the Product Name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description for the product"],
    },
    price: {
      type: Number,
      required: [true, "Please add the product price"],
    },
    category: {
      type: String,
      required: [true, "Please add the product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please add the product stock quantity"],
      default: 0,
    },
    images: {
      type: [String], // Array of image URLs for the product
    },
    brand: {
      type: String, // Optional brand field for the product
    },
    rating: {
      type: Number,
      default: 0, // Default rating is 0, will be updated by reviews
    },
    numReviews: {
      type: Number,
      default: 0, // Default number of reviews
    },
    isFeatured: {
      type: Boolean,
      default: false, // Whether the product is featured
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Modeling the product's schema
module.exports = mongoose.model("Product", productSchema);
