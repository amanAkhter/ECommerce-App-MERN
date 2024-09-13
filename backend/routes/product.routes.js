const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const validateToken = require("../middleware/validateTokenHandler");
const adminAuth = require("../middleware/adminAuth"); // Importing the admin middleware

// Public routes
router.route("/").get(getProducts);
router.route("/:id").get(getProduct);

// Protected routes (Admin only)
router.route("/").post(validateToken, adminAuth, postProduct);
router.route("/:id").put(validateToken, adminAuth, updateProduct);
router.route("/:id").delete(validateToken, adminAuth, deleteProduct);

module.exports = router;
