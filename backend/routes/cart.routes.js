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

router.route("/").get(retrieveUserCart).post(addItemToCart);
router.route("/:id").delete(removeItemFromCart);
// router.route("/current").get(validateToken, getCurrentUser); // validating the login token to get the cuurent user data

module.exports = router;
