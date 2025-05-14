import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

// This would be your MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/edubridge"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

// Get user profile
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }, // Exclude password
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update user profile
export async function PUT(request: Request) {
  try {
    const { userId, ...updateData } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password
    delete updateData.email
    delete updateData.role

    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
