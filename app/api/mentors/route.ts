import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  try {
    // Add support for status query param (pending/approved/declined)
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const client = await clientPromise;
    const db = client.db();
    const query: any = {};
    if (status) query.status = status;
    const mentors = await db.collection("mentors").find(query).toArray();
    return NextResponse.json({ mentors });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const database = client.db('edubridge');
    const mentors = database.collection('mentors');

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const mentorData = { ...body, password: hashedPassword };

    const result = await mentors.insertOne(mentorData);
    return NextResponse.json({ message: 'Mentor added successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error adding mentor:', error);
    return NextResponse.json({ error: 'Failed to add mentor' }, { status: 500 });
  }
}

// Add support for updating mentor status (approve/decline)
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const mentorsCollection = db.collection("mentors");
    const usersCollection = db.collection("users");
    // Update mentor status
    const mentor = await mentorsCollection.findOne({ _id: new ObjectId(id) });
    await mentorsCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
    // If approved, add mentor to users collection if not already present
    if (status === "approved" && mentor) {
      const existingUser = await usersCollection.findOne({ email: mentor.email });
      if (!existingUser) {
        await usersCollection.insertOne({
          name: mentor.name,
          email: mentor.email,
          password: mentor.password, // already hashed from signup
          role: "mentor",
          subject: mentor.subject,
          qualification: mentor.qualification,
          description: mentor.description,
          createdAt: new Date(),
          updatedAt: new Date(),
          profileCompleted: false,
        });
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
