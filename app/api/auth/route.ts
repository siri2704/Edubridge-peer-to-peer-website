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
    const { action, email, password, name, role } = await request.json()
    console.log("AUTH API: action=", action, "email=", email, "role=", role)
    const client = await clientPromise
    const db = client.db()
    const usersCollection = db.collection("users")

    // Register new user
    if (action === "register") {
      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email })
      if (existingUser) {
        console.log("AUTH API: User already exists", email)
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
        role: role || "user",
        profileCompleted: false,
      }
      await usersCollection.insertOne(newUser)
      console.log("AUTH API: User registered", email)
      return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
    }

    // Login user
    if (action === "login") {
      // Find user
      const user = await usersCollection.findOne({ email })
      if (!user) {
        console.log("AUTH API: User not found", email)
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
      // If mentor, check if approved
      if (user.role === "mentor") {
        // Check mentors collection for status
        const mentor = await db.collection("mentors").findOne({ email: user.email })
        if (!mentor || mentor.status !== "approved") {
          console.log("AUTH API: Mentor not approved", email)
          return NextResponse.json({ error: "Mentor account not approved yet" }, { status: 403 })
        }
      }
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        console.log("AUTH API: Invalid password for", email)
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
      console.log("AUTH API: Login success", email)
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
