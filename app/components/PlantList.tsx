"use client";
import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";

interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface CartItem extends Plant {
  quantity: number;
}

export default function PlantList() {
  const [plants, setPlants] = useState<Plant[]>([]);


  useEffect(() => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then((data: Plant[]) => setPlants(data));
  }, []);

  const addToCart = async (plant: Plant) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(plant),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Plants</h1>
      <div className="grid grid-cols-2 gap-4">
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
