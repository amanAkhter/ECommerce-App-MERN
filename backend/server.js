const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
// Database Connection - Import
const connectDb = require("./config/dbConnection");
// Routes Import
const userRoute = require("./routes/user.routes");
const cartRoute = require("./routes/cart.routes");
const productRoute = require("./routes/product.routes");

const port = process.env.PORT || 3000;

const app = express();

// Creating the connection to database
connectDb();

// Parsing the received data to json
app.use(bodyParser.json());

// Middleware to manage the routes of users
app.use("/api/users", userRoute);

// Middleware to manage the routes of carts
app.use("/api/cart", cartRoute);

// Middleware to manage the routes of products
app.use("/api/products", productRoute);

app.listen(port, () => {
  // Starting the server with the specified port
  console.log(`Server running on port ${port}`);
});
