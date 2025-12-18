"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Plant {
  id: string;
  name: string;
  description: string;
  image?: string | null;
  price: number;
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

   // Fetch plants from your backend
   useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch(`/api/plants`);
        if (!res.ok) {
          console.error("Plants API error:", res.status);
          setPlants([]);
          return;
        }
        const data = await res.json();
        setPlants(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch plants", err);
        setPlants([]);
      }
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

  const isInCart = (id: string) => cart.some((p) => p.id === id);

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Plant Collection
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plants.map((plant, index) => (
          <div
            key={plant.id ?? `plant-${index}`}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            {/* Plant Image */}
            <div className="relative w-full h-40 mb-3">
              <Image
                src={plant.image || "/images/bird.png"}
                alt={plant.name || "Unknown Plant"}
                fill
                className="rounded-md object-cover"
              />
            </div>

            {/* Plant Name */}
            <h3 className="text-lg font-bold text-center mb-2">
              {plant.name || "Unnamed Plant"}
            </h3>

            {/* Plant Description */}
            <p className="text-sm text-gray-700 text-center mb-3">
              {plant.description || "No description available."}
            </p>

            {/* Add/Remove Button */}
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
