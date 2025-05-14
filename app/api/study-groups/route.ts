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

// Get study groups
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get("subject")
    const userId = searchParams.get("userId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const client = await clientPromise
    const db = client.db()

    // Build query based on filters
    const query: any = {}

    if (subject) {
      query.subject = subject
    }

    if (userId) {
      query.$or = [{ createdBy: userId }, { members: userId }]
    }

    // Get study groups with pagination
    const studyGroups = await db
      .collection("studyGroups")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("studyGroups").countDocuments(query)

    return NextResponse.json({
      studyGroups,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get study groups error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create study group
export async function POST(request: Request) {
  try {
    const { name, description, subject, createdBy } = await request.json()

    if (!name || !subject || !createdBy) {
      return NextResponse.json({ error: "Name, subject, and creator are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const newStudyGroup = {
      name,
      description,
      subject,
      createdBy,
      members: [createdBy],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    }

    const result = await db.collection("studyGroups").insertOne(newStudyGroup)

    return NextResponse.json(
      {
        message: "Study group created successfully",
        studyGroupId: result.insertedId,
        success: true,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create study group error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
