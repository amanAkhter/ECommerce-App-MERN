const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

// @route GET /api/users/ [PRIVATE] (Gets all Users)
const getUsers = asyncHandler(async (req, res) => {
  // Retrieve all users from the database
  const users = await User.find();
  // Return the list of products
  res.json({
    users: res.status(200).json(users),
  });
});

// @route GET /api/users/current [PRIVATE] (Gets the current User)
const getCurrentUser = asyncHandler(async (req, res) => {
  // returns the current user as a response
  res.json({
    status: "Current User",
    user: req.user,
  });
});

// @route POST /api/users/register [PUBLIC] (Registers a new User)
const registerUser = asyncHandler(async (req, res) => {
  // extracts the values from the request body
  const { email, password, username, role } = req.body;

  // checks if any of the fields are missing
  if (!email || !password || !username) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // checks if the email or user name is already in the database
  const emailUnavailable = await User.findOne({ email });
  if (emailUnavailable) {
    res.status(404);
    throw new Error("Email is already registered! Try another one!");
  }
  const usernameUnavailable = await User.findOne({ username });
  if (usernameUnavailable) {
    res.status(404);
    throw new Error("Username is already registered! Try another one!");
  }

  // encrypts the password using hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // creates a new user with the provided details
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "user", // Default to 'user' if no role is provided
  });

  if (user) {
    res.status(201).json({
      status: "Created the user",
      values: user,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @route POST /api/users/login [PUBLIC] (logins the existing User)
const loginUser = asyncHandler(async (req, res) => {
  // extracts the values from the request body
  const { email, password } = req.body;

  // checks if any of the fields are missing
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // checks if the email id is available in the database
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // creates a auth-token with a payload
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
          role: user.role, // Include role in the token payload
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" } // You can adjust the expiration time as needed
    );
    res.status(200).json({ accessToken: accessToken, role: user.role });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid!");
  }
});

module.exports = {
  getUsers,
  getCurrentUser,
  registerUser,
  loginUser,
};
