import React from "react";

interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface PlantCardProps extends Plant {
  onAddToCart: (plant: Plant) => void;
}

export default function PlantCard({ id, name, description, price, onAddToCart }: PlantCardProps) {
  return (
    <div className="p-3 md:p-4 border rounded bg-green-50 hover:shadow-md transition">
      <h2 className="font-bold text-base md:text-lg mb-2">{name}</h2>
      <p className="text-sm md:text-base text-gray-700 mb-2 line-clamp-2">{description}</p>
      <p className="font-semibold text-green-700 mb-3">₹{price}</p>
      <button
        className="bg-green-500 text-white px-3 py-1.5 md:py-2 rounded text-sm md:text-base w-full hover:bg-green-600 transition"
        onClick={() => onAddToCart({ id, name, description, price })}
      >
        Add to Cart
      </button>
    </div>
  );
}
