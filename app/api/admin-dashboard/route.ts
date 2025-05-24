import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = await db.collection("users").countDocuments();
    const pendingMentors = await db.collection("mentors").countDocuments({ status: "pending" });
    const approvedMentors = await db.collection("mentors").countDocuments({ status: "approved" });
    const studyGroups = await db.collection("studyGroups").find({}).toArray();
    const resources = await db.collection("resources").find({}).toArray();
    const sessions = await db.collection("sessions").countDocuments();
    return NextResponse.json({
      users,
      pendingMentors,
      approvedMentors,
      studyGroups,
      resources,
      sessions
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch admin stats" }, { status: 500 });
  }
}
