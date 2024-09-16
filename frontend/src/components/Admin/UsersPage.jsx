import React, { useState, useEffect } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // getting the token from local storage/session storage
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await fetch("http://localhost:9000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });
        const data = await response.json();
        // console.log("API Response:", data); // Log the API response to verify its structure
        setUsers(data); // Use the array directly
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-bold mb-8">Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {/* Ensure users is defined and not empty */}
          {users && users.length > 0 ? (
            users
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.role}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 p-2 text-center"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
