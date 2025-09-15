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
    <div className="p-4 border rounded bg-green-50">
      <h2 className="font-bold">{name}</h2>
      <p>{description}</p>
      <p>₹{price}</p>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        onClick={() => onAddToCart({ id, name, description, price })}
      >
        Add to Cart
      </button>
    </div>
  );
}
