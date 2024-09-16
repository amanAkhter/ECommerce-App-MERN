const express = require("express");
const router = express.Router();
const {
  retrieveUserCart,
  addItemToCart,
  removeItemFromCart,
} = require("../controllers/cart.controller");

const validateToken = require("../middleware/validateTokenHandler");

// Apply middleware to protect routes
router.use(validateToken);

// Routes for cart operations
router.route("/").get(retrieveUserCart).post(addItemToCart);
router.route("/:id").delete(removeItemFromCart);

module.exports = router;
