import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// This would be your MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/edubridge"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function POST(request: Request) {
  try {
    const { action, email, password, name } = await request.json()

    const client = await clientPromise
    const db = client.db()
    const usersCollection = db.collection("users")

    // Register new user
    if (action === "register") {
      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email })
      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create new user
      const newUser = {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
        profileCompleted: false,
      }

      await usersCollection.insertOne(newUser)

      return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
    }

    // Login user
    if (action === "login") {
      // Find user
      const user = await usersCollection.findOne({ email })
      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      )

      return NextResponse.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileCompleted: user.profileCompleted,
        },
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
