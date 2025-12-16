import { NextRequest, NextResponse } from "next/server";

interface PlantAPIr {
  id: number;
  common_name: string | null;
  scientific_name: string;
  family_common_name?: string | null;
  image_url: string | null;
}

export async function GET(
  req: NextRequest,
   { params }: { params: { id: string } }
) {
  try {
    const  id  = params?.id;
    console.log(id)
    console.log("Plant ID:", id);
     const ids = [1, 2, 3, 4, 5,6,7,8];
    const r = await Promise.all(
     ids.map((id) => fetch(`https://trefle.io/api/v1/plants/${id}?token=Xkai9qe3CnSMsosihbGvPKCKxPhYahuV5QJLfGPiQm4s`).then((res) => res.json()))
      );

  
    console.log(r)


    console.log("API URL:", r.url, "Status:", r.status);

    if (!r.ok) {
      return NextResponse.json(
        { error: "Failed to fetch plant details" },
        { status: r.status }
      );
    }

    const data = await r.json();
    const plant: PlantAPIr = data.data;

    return NextResponse.json({
      id: plant.id,
      name: plant.common_name || plant.scientific_name,
      description: plant.family_common_name || "No description available",
      image: plant.image_url,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch plant details" },
      { status: 500 }
    );
  }
}
