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

// Get resources
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get("subject")
    const type = searchParams.get("type")
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

    if (type) {
      query.fileType = type
    }

    if (userId) {
      query.uploadedBy = userId
    }

    // Get resources with pagination
    const resources = await db
      .collection("resources")
      .find(query)
      .sort({ uploadedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("resources").countDocuments(query)

    return NextResponse.json({
      resources,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get resources error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Upload resource
export async function POST(request: Request) {
  try {
    const { title, description, subject, fileType, fileUrl, uploadedBy, tags } = await request.json()

    if (!title || !subject || !fileType || !fileUrl || !uploadedBy) {
      return NextResponse.json(
        { error: "Title, subject, file type, file URL, and uploader are required" },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db()

    const newResource = {
      title,
      description,
      subject,
      fileType,
      fileUrl,
      uploadedBy,
      tags: tags || [],
      uploadedAt: new Date(),
      updatedAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      views: 0,
    }

    const result = await db.collection("resources").insertOne(newResource)

    return NextResponse.json(
      {
        message: "Resource uploaded successfully",
        resourceId: result.insertedId,
        success: true,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Upload resource error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
