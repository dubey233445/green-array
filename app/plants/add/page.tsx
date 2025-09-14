"use client";
import { useState } from "react";

export default function AddPlantPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  console.log(token?"token":"not avai");
  

  const res = await fetch("/plants/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token ? `${token}` : "", // send token if available
    },
    body: JSON.stringify({ name, description, price }),
  });

  const data = await res.json();
  if (res.ok) {
    setMessage("✅ Plant added successfully!");
    setName("");
    setDescription("");
    setPrice("");
  } else {
    setMessage(data.error);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-green-200"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Add a Plant
        </h2>

        <input
  type="text"
  placeholder="Plant Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-700 text-gray-800"
  required
/>

<textarea
  placeholder="Plant Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={3}
  className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-700 text-gray-800"
  required
/>

<input
  type="number"
  placeholder="Price (₹)"
  value={price}
  onChange={(e) => setPrice(Number(e.target.value))}
  className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-700 text-gray-800"
  required
/>


        <button
          type="submit"
          className="w-full bg-green-700 text-white font-semibold p-3 rounded-lg hover:bg-green-800 transition"
        >
          Add Plant
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-700">{message}</p>
        )}
      </form>
    </div>
  );
}
