import { NextResponse } from "next/server";
import { Brands } from "@/lib/collections";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const docs = await Brands.find();
    const brands = docs.map((doc) => ({
      id: doc._id.toString(),
      name: String(doc.name ?? doc.slug ?? ""),
      slug: String(doc.slug ?? ""),
    }));
    return NextResponse.json(brands);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load brands" },
      { status: 500 },
    );
  }
}
