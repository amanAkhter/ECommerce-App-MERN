const express = require("express");
const router = express.Router();
const {
  getUsers,
  getCurrentUser,
  registerUser,
  loginUser
} = require("../controllers/user.controller");

const adminAuth = require("../middleware/adminAuth")

const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getUsers, adminAuth);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, getCurrentUser); // validating the login token to get the cuurent user data

module.exports = router;
