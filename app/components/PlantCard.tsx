import Link from "next/link";
import React from "react";

interface PlantCardProps {
  name: string;
  description: string;
  price: number;
  id:string
}

export default function PlantCard({ name, description, price,id }: PlantCardProps) {
  return (
    <>
      <Link href={`/plants/${id}`}>
    <div className="bg-green-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-green-800 mb-2">{name}</h3>
      <p className="text-sm text-green-700 mb-3">{description}</p>
      <p className="text-green-900 font-semibold">₹ {price}</p>
    </div>
    </Link>
    </>
  );
}
