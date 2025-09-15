import { NextRequest, NextResponse } from "next/server";

interface PlantAPIResponse {
  id: number;
  common_name: string | null;
  scientific_name: string;
  family_common_name?: string | null;
  image_url: string | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // ✅ now we will use it

  try {
    const response = await fetch(
      `https://trefle.io/api/v1/plants/${id}?token=Xkai9qe3CnSMsosihbGvPKCKxPhYahuV5QJLfGPiQm4`
    );
    const data = await response.json();

    const plant: PlantAPIResponse = data.data;

    return NextResponse.json({
      id: plant.id,
      name: plant.common_name || plant.scientific_name,
      description: plant.family_common_name || "No description available",
      image: plant.image_url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch plant" }, { status: 500 });
  }
}
