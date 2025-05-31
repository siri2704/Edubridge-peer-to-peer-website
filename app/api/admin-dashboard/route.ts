import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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

export async function PATCH(req: NextRequest) {
  try {
    const url = new URL(req.url!);
    const mentorId = url.pathname.split("/").pop();
    const { status } = await req.json();
    if (!mentorId || !status) return NextResponse.json({ error: "Missing mentorId or status" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const mentors = db.collection("mentors");
    const mentor = await mentors.findOne({ _id: new ObjectId(mentorId) });
    if (!mentor) return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
    await mentors.updateOne({ _id: new ObjectId(mentorId) }, { $set: { status } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
