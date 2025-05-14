import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const database = client.db('edubridge');
    const mentors = database.collection('mentors');

    const mentorsList = await mentors.find({}).toArray();
    return NextResponse.json(mentorsList);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return NextResponse.json({ error: 'Failed to fetch mentors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const database = client.db('edubridge');
    const mentors = database.collection('mentors');

    const result = await mentors.insertOne(body);
    return NextResponse.json({ message: 'Mentor added successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error adding mentor:', error);
    return NextResponse.json({ error: 'Failed to add mentor' }, { status: 500 });
  }
}
