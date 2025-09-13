"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Plant {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export default function PlantDetailsPage() {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPlant = async () => {
      const res = await fetch(`/api/plants/${id}`);
      const data = await res.json();
      setPlant(data);
      setLoading(false);
    };

    fetchPlant();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <p className="text-green-700">Loading plant details...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <p className="text-red-600">Plant not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-green-200">
        <h1 className="text-3xl font-bold text-green-800 mb-4">{plant.name}</h1>
        <p className="text-green-700 text-lg mb-6">{plant.description}</p>
        <p className="text-green-900 text-2xl font-semibold">₹ {plant.price}</p>
      </div>
    </div>
  );
}
