"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await res.json();
    const headers = new Headers()
     headers.set("token", data.token);
    if (res.ok) {
      setMessage("✅ Login Successful!");
      localStorage.setItem("token", data.token); // save token
       setTimeout(() => {
        router.push("/"); // redirect to login page
      }, 1500);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <form onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-green-200"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-green-600 placeholder-gray-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-black focus:outline-none  placeholder-gray-500 focus:ring-2 focus:ring-green-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white font-semibold p-3 rounded-lg hover:bg-green-800 transition"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-700">{message}</p>
        )}
      </form>
    </div>
  );
}
