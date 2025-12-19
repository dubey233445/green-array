"use client";
import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";

interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function PlantList() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    fetch("/api/plants")
      .then((res) => {
        if (!res.ok) {
          console.error("Plants API error:", res.status);
          setPlants([]);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setPlants(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch plants", err);
        setPlants([]);
      });
  }, []);

  const addToCart = async (plant: Plant) => {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(plant),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Plants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            id={plant.id}
            name={plant.name}
            description={plant.description}
            price={plant.price}
            onAddToCart={addToCart}
          />
        ))}
      </div>

     
    </div>
  );
}
