import { NextResponse } from "next/server";

interface PlantAPIResponse {
  id: number;
  common_name: string | null;
  scientific_name: string;
  family_common_name?: string | null;
  image_url: string | null;
}

// ✅ Dynamic route: /api/plants/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(
      `https://trefle.io/api/v1/plants/${id}?token=Xkai9qe3CnSMsosihbGvPKCKxPhYahuV5QJLfGPiQm4`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch plant details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const plant: PlantAPIResponse = data.data;

    const plantDetails = {
      id: plant.id,
      name: plant.common_name || plant.scientific_name,
      description: plant.family_common_name || "No description available",
      image: plant.image_url,
    };

    return NextResponse.json(plantDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch plant details" },
      { status: 500 }
    );
  }
}
