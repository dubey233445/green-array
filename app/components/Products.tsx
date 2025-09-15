"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Plant {
  id: number;
  common_name: string;
  description: string;
  default_image: {
    medium_url: string;
  };
}

export default function PlantShowcase() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [cart, setCart] = useState<Plant[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Fetch plants from Perenual API (example species IDs)
  useEffect(() => {
    async function fetchPlants() {
      const ids = [1, 2, 3, 4, 5]; // You can choose different plant IDs
      const responses = await Promise.all(
        ids.map((id) =>
          fetch(
            `https://perenual.com/api/v2/species/details/${id}?key=sk-lZ7t68c81a2f58ed612383`
          ).then((res) => res.json())
        )
      );
      setPlants(responses);
    }
    fetchPlants();
  }, []);

  // Toggle add/remove from cart
  const toggleCart = (plant: Plant) => {
    const exists = cart.find((p) => p.id === plant.id);
    let updatedCart;
    if (exists) {
      updatedCart = cart.filter((p) => p.id !== plant.id); // remove
    } else {
      updatedCart = [...cart, plant]; // add
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const isInCart = (id: number) => cart.some((p) => p.id === id);

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Plant Collection
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plants.map((plant) => (
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
            <p className="text-sm text-gray-700 text-center mb-3">
              {plant.description || "No description available."}
            </p>
            <button
              onClick={() => toggleCart(plant)}
              className={`w-full py-2 rounded text-white ${
                isInCart(plant.id) ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {isInCart(plant.id) ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
