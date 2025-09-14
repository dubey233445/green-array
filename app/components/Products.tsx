"use client";
import Image from "next/image";

const plants = [
  {
    id: 1,
    name: "Bird of Paradise",
    description: "Bright tropical flower. Needs good sunlight.",
    image: "/images/bird.png",
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    description: "Modern houseplant. Requires weekly watering.",
    image: "/images/fiddle.png",
  },
  {
    id: 3,
    name: "Guaiacum",
    description: "Rare medicinal plant with unique leaf structure.",
    image: "/images/guaiacum.png",
  },
  {
    id: 4,
    name: "Japanese Maple",
    description: "Stunning red foliage. Prefers partial sunlight.",
    image: "/images/maple.png",
  },
  {
    id: 5,
    name: "Monstera",
    description: "Air-purifying, beautiful split leaves. Great for indoors.",
    image: "/images/monstera.png",
  },
  {
    id: 6,
    name: "Potted Marigolds",
    description: "Bright, cheerful flowers known for their golden-orange hues. Great for gardens or balconies.",
    image: "/images/marigold.png",
  },
  {
    id: 7,
    name: "Alocasia Amazonica Poly",
    description: "Striking dark green foliage with silver veins. Prefers humid conditions and filtered light.",
    image: "/images/alocasia.png",
  },
  {
    id: 8,
    name: "Money Plant",
    description: "Easy to care for and believed to bring luck. Grows well in soil or water indoors.",
    image: "/images/money.png",
  },
];

export default function PlantShowcase() {
  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Top 8 Plants
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="relative w-full h-40 mb-3">
              <Image
                src={plant.image}
                alt={plant.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-center mb-2">
              {plant.name}
            </h3>
            <p className="text-sm text-gray-700 text-center">
              {plant.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
