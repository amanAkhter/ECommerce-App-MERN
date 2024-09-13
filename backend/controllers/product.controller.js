const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @route GET /api/products/ [PUBLIC] (Get all products)
const getProducts = asyncHandler(async (req, res) => {
  // Retrieve all products from the database
  const products = await Product.find();
  
  // Return the list of products
  res.status(200).json(products);
});

// @route GET /api/products/:id [PUBLIC] (Get a specific product)
const getProduct = asyncHandler(async (req, res) => {
  // Find the product by its ID
  const product = await Product.findById(req.params.id);
  
  // If the product is not found, throw an error
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  
  // Return the product
  res.status(200).json({
    status: "Product Found",
    product: product,
  });
});

// @route POST /api/products/ [PROTECTED - ADMIN] (Create a product)
const postProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, images, brand, isFeatured } = req.body;

  // Check if required fields are missing
  if (!name || !description || !price || !category || !stock) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // Create a new product
  const product = await Product.create({
    user_id: req.user.id, // Assuming the admin is authenticated
    name,
    description,
    price,
    category,
    stock,
    images,
    brand,
    isFeatured,
  });

  // Return the created product
  res.status(201).json({
    status: "Product Created Successfully",
    product: product,
  });
});

// @route PUT /api/products/:id [PROTECTED - ADMIN] (Update a specific product)
const updateProduct = asyncHandler(async (req, res) => {
  // Find the product by its ID
  const product = await Product.findById(req.params.id);
  
  // If the product is not found, throw an error
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the user has permissions to update the product
  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to update this product");
  }

  // Update the product
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // Return the updated product
  res.status(202).json({
    status: "Product Updated",
    product: updatedProduct,
  });
});

// @route DELETE /api/products/:id [PROTECTED - ADMIN] (Delete a specific product)
const deleteProduct = asyncHandler(async (req, res) => {
  // Find the product by its ID
  const product = await Product.findById(req.params.id);
  
  // If the product is not found, throw an error
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the user has permissions to delete the product
  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to delete this product");
  }

  // Delete the product
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  // Return the deleted product
  res.status(202).json({
    status: "Product Deleted",
    product: deletedProduct,
  });
});

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
};
