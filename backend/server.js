const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS
// Database Connection - Import
const connectDb = require("./config/dbConnection");
// Default User Creation
const createDefaultAdmin = require("./createDefaultAdminUser");
// Routes Import
const userRoute = require("./routes/user.routes");
const cartRoute = require("./routes/cart.routes");
const productRoute = require("./routes/product.routes");

const port = process.env.PORT || 3000;

const app = express();

// Creating the connection to database
connectDb();

// Creating the connection to database
createDefaultAdmin();

// Enable CORS
app.use(cors({ origin: "http://localhost:5173" }));

// Parsing the received data to json
app.use(bodyParser.json());

// Middleware to manage the routes of users
app.use("/api/users", userRoute);

// Middleware to manage the routes of carts
app.use("/api/cart", cartRoute);

// Middleware to manage the routes of products
app.use("/api/products", productRoute);

// Serving static files from the uploads folder
// app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  // Starting the server with the specified port
  console.log(`Server running on port ${port}`);
});
