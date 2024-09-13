const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Middleware to validate if the user is an admin
const adminAuth = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // Get user from the decoded token payload
      const user = await User.findById(decoded.user.id).select("-password");

      // Check if the user exists and is an admin
      if (user && user.role === "admin") {
        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware or controller
      } else {
        res.status(403);
        throw new Error("User is not authorized as an admin");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
});

module.exports = adminAuth;
