import React, { useState, useEffect } from "react";

const DashboardPage = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      // getting the token from local storage/session storage
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      // Fethcing all user and products and using length function to get their count
      try {
        // Fetch all users
        const usersResponse = await fetch("http://localhost:9000/api/users", { headers: { Authorization: `Bearer ${token}` } });
        const usersData = await usersResponse.json();
        setUsersCount(usersData.length);

        // Fetch all products
        const productsResponse = await fetch("http://localhost:9000/api/products"); 
        const productsData = await productsResponse.json();
        setProductsCount(productsData.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-bold mb-8">Admin - Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Users</td>
            <td className="border border-gray-300 p-2">{usersCount}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Products</td>
            <td className="border border-gray-300 p-2">{productsCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
