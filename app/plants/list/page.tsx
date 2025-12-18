"use client";
import { useEffect, useState } from "react";
import PlantCard from "../../components/PlantCard";

interface Plant {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export default function PlantListPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  const addToCart = () => {
    alert("Item added to cart!");
  };

  useEffect(() => {
    const fetchPlants = async () => {
      const res = await fetch("/api/plants");
      const data = await res.json();
      setPlants(data);
      setLoading(false);
    };

    fetchPlants();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        🌿 Plant Listings
      </h2>
      {loading ? (
        <p className="text-center text-green-700">Loading plants...</p>
      ) : plants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plants.map((plant) => (
            <PlantCard
              onAddToCart={addToCart}
              id={plant._id}
              key={plant._id}
              name={plant.name}
              description={plant.description}
              price={plant.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-green-700">No plants available yet.</p>
      )}
    </div>
  );
}
