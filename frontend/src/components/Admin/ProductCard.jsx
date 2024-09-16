import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onProductDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Redirect to edit page with the product id
    navigate(`/admin/edit-product/${product._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Get the token from local storage/session storage
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        
        const response = await fetch(`http://localhost:9000/api/products/${product._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Product deleted successfully");
          // Notify parent component to update the product list
          onProductDelete(product._id);
        } else {
          const errorData = await response.json();
          console.error("Error deleting product:", errorData.message || errorData);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <img
        src={product.primaryImage} // Adjust to match the field name from your model
        alt={product.name}
        className="w-full h-40 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center space-x-1"
        >
          <FaEdit />
          <span>Edit</span>
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded flex items-center space-x-1"
        >
          <FaTrash />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
