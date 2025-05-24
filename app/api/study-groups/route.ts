import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST: Create a new study group
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("studyGroups").insertOne({
      name: body.name,
      description: body.description,
      members: body.members || [],
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create study group" }, { status: 500 });
  }
}

// GET: List all study groups
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const groups = await db.collection("studyGroups").find({}).toArray();
    return NextResponse.json(groups);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch study groups" }, { status: 500 });
  }
}
