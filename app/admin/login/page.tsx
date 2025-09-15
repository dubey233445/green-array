"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-2 p-2 border"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
