const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const fs = require("fs"); // For file system operations

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
  res.status(200).json(product);
});

// @route POST /api/products/ [PROTECTED - ADMIN] (Create a product)
const postProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, brand, isFeatured } = req.body;

  if (!name || !description || !price || !category || !stock) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // Handle image uploads
  let primaryImage = "";
  let images = [];

  if (req.files && req.files.length > 0) {
    primaryImage = req.files.find(file => file.fieldname === 'primaryImage')?.path || "";
    images = req.files.filter(file => file.fieldname === 'images').map(file => file.path);
  }

  // Create a new product
  const product = await Product.create({
    user_id: req.user.id,
    name,
    description,
    price,
    category,
    stock,
    primaryImage,
    images,
    brand,
    isFeatured,
  });

  res.status(201).json(product);
});


// @route PUT /api/products/:id [PROTECTED - ADMIN] (Update a specific product)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to update this product");
  }

  // Handle image uploads
  if (req.files && req.files.length > 0) {
    const primaryImage = req.files[0].path; // First uploaded image
    const images = req.files.slice(1).map((file) => file.path); // Other uploaded images

    // Delete old images from filesystem if they exist
    if (product.primaryImage && fs.existsSync(product.primaryImage)) {
      fs.unlinkSync(product.primaryImage);
    }
    product.primaryImage = primaryImage;

    images.forEach((img) => {
      if (fs.existsSync(img)) {
        fs.unlinkSync(img);
      }
    });
    product.images = images;
  }

  // Update other fields
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.category = req.body.category || product.category;
  product.stock = req.body.stock || product.stock;
  product.brand = req.body.brand || product.brand;
  product.isFeatured = req.body.isFeatured || product.isFeatured;

  const updatedProduct = await product.save();

  res.status(202).json(updatedProduct);
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
  res.status(202).json(deletedProduct);
});

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
};
