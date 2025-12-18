import { NextRequest, NextResponse } from "next/server";

interface PlantAPIr {
  id: number;
  common_name: string | null;
  scientific_name: string;
  family_common_name?: string | null;
  image_url: string | null;
}

export async function GET(req: NextRequest) {
  try {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8];
    const results = await Promise.all(
      ids.map((id) =>
        fetch(
          `https://trefle.io/api/v1/plants/${id}?token=Xkai9qe3CnSMsosihbGvPKCKxPhYahuV5QJLfGPiQm4s`
        ).then((res) => res.json())
      )
    );

    const plants = results.map((item) => {
      const plant: PlantAPIr = item.data;
      return {
        id: plant.id,
        name: plant.common_name || plant.scientific_name,
        description: plant.family_common_name || "No description available",
        image: plant.image_url,
      };
    });

    return NextResponse.json(plants);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch plant details" },
      { status: 500 }
    );
  }
}
