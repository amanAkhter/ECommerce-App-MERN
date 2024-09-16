const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
      unique: [true, "Email address already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Either 'user' or 'admin'
      default: "user", // Default role is 'user'
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Modeling the user's schema
module.exports = mongoose.model("User", userSchema);
