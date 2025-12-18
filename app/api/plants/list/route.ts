import { NextResponse } from "next/server";
import { ensureSupabase } from "@/lib/supabase";

const samplePlants = [
  {
    id: "bird-of-paradise",
    name: "Bird of Paradise",
    description: "Bright tropical flower. Needs good sunlight.",
    price: 49,
    image: "/images/bird.png",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    description: "Modern houseplant. Requires weekly watering.",
    price: 59,
    image: "/images/fiddle.png",
  },
  {
    id: "guaiacum",
    name: "Guaiacum",
    description: "Rare medicinal plant with unique leaf structure.",
    price: 65,
    image: "/images/guaiacum.png",
  },
  {
    id: "japanese-maple",
    name: "Japanese Maple",
    description: "Stunning red foliage. Prefers partial sunlight.",
    price: 120,
    image: "/images/maple.png",
  },
  {
    id: "monstera",
    name: "Monstera",
    description: "Air-purifying, beautiful split leaves. Great for indoors.",
    price: 45,
    image: "/images/monstera.png",
  },
  {
    id: "marigold",
    name: "Potted Marigolds",
    description: "Bright, cheerful flowers for gardens or balconies.",
    price: 18,
    image: "/images/marigold.png",
  },
  {
    id: "alocasia",
    name: "Alocasia Amazonica Poly",
    description: "Dark green foliage with silver veins; prefers humid light.",
    price: 35,
    image: "/images/alocasia.png",
  },
  {
    id: "money-plant",
    name: "Money Plant",
    description: "Easy to care for; brings luck. Grows well indoors.",
    price: 22,
    image: "/images/money.png",
  },
];

export async function GET() {
  try {
    const sb = ensureSupabase();
    const { data, error } = await sb.from("plants").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json(samplePlants, { status: 200 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(samplePlants, { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching plants:", error);
    return NextResponse.json(samplePlants, { status: 200 });
  }
}
