import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deletion, setDeletion] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/products/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    };
    fetchProducts();
  }, [showForm, deletion]); // Fetch products again after adding a new product/ deleting a product

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };


  const handleProductDelete = (id) => {
    setDeletion(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-bold mb-8">Products Management</h1>
      <button
        onClick={handleAddProductClick}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        Add Product
      </button>
      {showForm && <AddProductForm onClose={handleCloseForm} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onProductDelete={handleProductDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
