/**
 * @description This middleware is used to validate the token and store the user information in the req.user object.
 */

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const validateToken = asyncHandler(async (req, res, Next) => {
  let token;
  // accessing the "Header" from the request 
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    // Extract the token from the Authorization header
    token = authHeader.split(" ")[1];
    // Verify the token using the ACCESS_TOKEN_SECRET from the .env file
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // If the token is invalid, throw an error with a status code of 401 (Unauthorized)
        res.status(401);
        throw new Error("User is unauthorized");
      }
      // If the token is valid, store the user information in the req.user object
      req.user = decoded.user;
      // The next function in the middleware chain.
      Next();
    });

    if (!token) {
      // If the token is missing, throw an error with a status code of 401 (Unauthorized)
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;