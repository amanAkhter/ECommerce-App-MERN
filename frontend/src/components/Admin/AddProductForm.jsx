// AddProductForm.jsx
import React, { useState } from "react";

const AddProductForm = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
    isFeatured: false,
    primaryImage: null,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setProduct({
        ...product,
        [name]: files[0],
      });
    } else if (type === "checkbox") {
      setProduct({
        ...product,
        [name]: checked,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (Array.isArray(product[key])) {
        product[key].forEach((file, index) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
      // getting the token from local storage/session storage
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch("http://localhost:9000/api/products/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        // console.log("Product added successfully:", data);
        onClose(); // Close the form after successful submission
      } else {
        console.error("Error adding product:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border border-gray-300 p-2 mb-4 w-full"
            required
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="border border-gray-300 p-2 mb-4 w-full"
            required
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="border border-gray-300 p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="border border-gray-300 p-2 mb-4 w-full"
            required
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="border border-gray-300 p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          <label className="block mb-4">
            <input
              type="checkbox"
              name="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
              className="mr-2"
            />
            Featured
          </label>
          <label className="block mb-4">
          Primary Image
          <input
            type="file"
            name="primaryImage"
            onChange={handleChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          </label>
          <label className="block mb-4">
          Other Images
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
