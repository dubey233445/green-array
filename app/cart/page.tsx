"use client";
import { useEffect, useState } from "react";
import Image from "next/image";   // ✅ this was missing!

interface Plant {
  id: number;
  common_name: string;
  description: string;
  default_image: {
    medium_url: string;
  };
}

export default function CartPage() {
  const [cart, setCart] = useState<Plant[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cart.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="relative w-full h-40 mb-3">
                <Image
                  src={plant.default_image?.medium_url || "/images/placeholder.png"}
                  alt={plant.common_name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">
                {plant.common_name}
              </h3>
              <p className="text-sm text-gray-700 text-center">
                {plant.description || "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
