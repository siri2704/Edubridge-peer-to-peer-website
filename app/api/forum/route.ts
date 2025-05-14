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

// Get forum questions
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get("subject")
    const tag = searchParams.get("tag")
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

    if (tag) {
      query.tags = tag
    }

    if (userId) {
      query.askedBy = userId
    }

    // Get questions with pagination
    const questions = await db
      .collection("forumQuestions")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("forumQuestions").countDocuments(query)

    return NextResponse.json({
      questions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get forum questions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Post a question
export async function POST(request: Request) {
  try {
    const { title, content, subject, askedBy, tags } = await request.json()

    if (!title || !content || !subject || !askedBy) {
      return NextResponse.json({ error: "Title, content, subject, and asker are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const newQuestion = {
      title,
      content,
      subject,
      askedBy,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      views: 0,
      answerCount: 0,
      hasAcceptedAnswer: false,
    }

    const result = await db.collection("forumQuestions").insertOne(newQuestion)

    return NextResponse.json(
      {
        message: "Question posted successfully",
        questionId: result.insertedId,
        success: true,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Post question error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
