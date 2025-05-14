import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  const groupId = url.searchParams.get("groupId");
  if (!groupId) return NextResponse.json({ error: "Missing groupId" }, { status: 400 });
  const client = await clientPromise;
  const db = client.db();
  const messages = await db.collection("chatMessages").find({ groupId }).sort({ timestamp: 1 }).toArray();
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const { groupId, sender, text, fileUrl, fileType, fileName } = await req.json();
  if (!groupId || !sender || (!text && !fileUrl)) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const client = await clientPromise;
  const db = client.db();
  const message = {
    groupId,
    sender,
    text: text || null,
    fileUrl: fileUrl || null,
    fileType: fileType || null,
    fileName: fileName || null,
    timestamp: new Date(),
  };
  await db.collection("chatMessages").insertOne(message);
  return NextResponse.json({ success: true, message });
}
