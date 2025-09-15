// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  ownerId: number;
  ownerUsername: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // Admin login credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123"; // change to a secure password

  // Prompt for admin login
  useEffect(() => {
    const username = prompt("Enter admin username:");
    const password = prompt("Enter admin password:");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      fetchData();
    } else {
      alert("Invalid credentials. Access denied.");
    }
  }, []);

  // Fetch all users and products
 const fetchData = async () => {
  try {
    const usersRes = await fetch("/api/users");
    const usersData: User[] = await usersRes.json();
    setUsers(usersData);

    const productsRes = await fetch("/api/products");
    const productsData: Product[] = await productsRes.json();
    setProducts(productsData);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};


  // Delete user (and their products)
  const deleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/users/${userId}`, { method: "DELETE" });
      setUsers(users.filter((u) => u.id !== userId));
      setProducts(products.filter((p) => p.ownerId !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  // Delete product
  const deleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${productId}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  if (!adminLoggedIn) return <div>Access denied</div>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-800">
        Admin Dashboard
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Username</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-2 py-1">{user.id}</td>
                  <td className="border px-2 py-1">{user.username}</td>
                  <td className="border px-2 py-1">{user.email}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Owner</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border px-2 py-1">{product.id}</td>
                  <td className="border px-2 py-1">{product.name}</td>
                  <td className="border px-2 py-1">{product.ownerUsername}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
