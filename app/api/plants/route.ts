// /app/api/plants/route.ts
import { NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(plants);
}
