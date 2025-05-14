import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

// This would be your MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/edubridge"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

// Get sessions
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const type = searchParams.get("type") // mentorship, group, all
    const status = searchParams.get("status") // upcoming, past, all
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Build query based on filters
    const query: any = {
      $or: [{ mentorId: userId }, { menteeId: userId }, { participants: userId }],
    }

    if (type && type !== "all") {
      query.sessionType = type
    }

    if (status) {
      const now = new Date()
      if (status === "upcoming") {
        query.startTime = { $gt: now }
      } else if (status === "past") {
        query.endTime = { $lt: now }
      }
    }

    // Get sessions with pagination
    const sessions = await db
      .collection("sessions")
      .find(query)
      .sort({ startTime: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("sessions").countDocuments(query)

    return NextResponse.json({
      sessions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get sessions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create session
export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      sessionType,
      startTime,
      endTime,
      mentorId,
      menteeId,
      studyGroupId,
      participants,
      subject,
    } = await request.json()

    if (!title || !sessionType || !startTime || !endTime || !subject) {
      return NextResponse.json(
        { error: "Title, session type, start time, end time, and subject are required" },
        { status: 400 },
      )
    }

    // Validate session type specific fields
    if (sessionType === "mentorship" && (!mentorId || !menteeId)) {
      return NextResponse.json(
        { error: "Mentor ID and mentee ID are required for mentorship sessions" },
        { status: 400 },
      )
    }

    if (sessionType === "group" && (!studyGroupId || !participants || participants.length === 0)) {
      return NextResponse.json(
        { error: "Study group ID and participants are required for group sessions" },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db()

    const newSession = {
      title,
      description,
      sessionType,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      mentorId: sessionType === "mentorship" ? mentorId : null,
      menteeId: sessionType === "mentorship" ? menteeId : null,
      studyGroupId: sessionType === "group" ? studyGroupId : null,
      participants: sessionType === "group" ? participants : sessionType === "mentorship" ? [mentorId, menteeId] : [],
      subject,
      status: "scheduled",
      createdAt: new Date(),
      updatedAt: new Date(),
      meetingUrl: null,
      resources: [],
    }

    const result = await db.collection("sessions").insertOne(newSession)

    return NextResponse.json(
      {
        message: "Session created successfully",
        sessionId: result.insertedId,
        success: true,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
