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
    <section className="p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-800 mb-6 text-center">
        Plant Collection
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plants.map((plant, index) => (
          <div
            key={plant.id ?? `plant-${index}`}
            className="bg-white rounded-lg shadow-md p-3 md:p-4 hover:shadow-lg transition"
          >
            {/* Plant Image */}
            <div className="relative w-full h-36 sm:h-40 md:h-48 mb-3">
              <Image
                src={plant.image || "/images/bird.png"}
                alt={plant.name || "Unknown Plant"}
                fill
                className="rounded-md object-cover"
              />
            </div>

            {/* Plant Name */}
            <h3 className="text-base md:text-lg font-bold text-center mb-2">
              {plant.name || "Unnamed Plant"}
            </h3>

            {/* Plant Description */}
            <p className="text-xs md:text-sm text-gray-700 text-center mb-3 line-clamp-2">
              {plant.description || "No description available."}
            </p>

            {/* Add/Remove Button */}
            <button
              onClick={() => toggleCart(plant)}
              className={`w-full py-1.5 md:py-2 rounded text-white text-sm md:text-base ${
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
