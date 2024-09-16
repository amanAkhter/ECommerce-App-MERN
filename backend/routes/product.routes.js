const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const validateToken = require("../middleware/validateTokenHandler"); // Import the token validation middleware for users
const adminAuth = require("../middleware/adminAuth"); // Import the admin auth middleware
const upload = require("../middleware/uploadMiddleware"); // Import the upload middleware

// Public routes
router.route("/").get(getProducts); // Get all products
router.route("/:id").get(getProduct); // Get product by ID

// Protected routes (Admin only)
router.route("/").post(validateToken, adminAuth, upload, postProduct); // Add image upload middleware
router.route("/:id").put(validateToken, adminAuth, upload, updateProduct); // Add image upload middleware
router.route("/:id").delete(validateToken, adminAuth, deleteProduct); // Delete Product by ID

module.exports = router;
