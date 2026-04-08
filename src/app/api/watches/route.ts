import { NextRequest, NextResponse } from "next/server";
import { Watches } from "@/lib/collections";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const brand = request.nextUrl.searchParams.get("brand")?.trim();
  if (!brand) {
    return NextResponse.json(
      { error: "Missing required query parameter: brand" },
      { status: 400 },
    );
  }

  try {
    const docs = await Watches.find({ brand: brand });
    const watches = docs.map((doc) => ({
      id: doc._id.toString(),
      brand: String(doc.brand ?? ""),
      collection: String(doc.collection ?? ""),
      model: String(doc.model ?? ""),
      slug: String(doc.slug ?? ""),
      image: String(doc.image ?? ""),
    }));
    return NextResponse.json(watches);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load watches" },
      { status: 500 },
    );
  }
}
