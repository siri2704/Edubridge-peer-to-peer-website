import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

// GET: Get all session requests for a mentor (by mentorId or mentorEmail)
export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  const mentorId = url.searchParams.get("mentorId");
  const mentorEmail = url.searchParams.get("mentorEmail");
  const client = await clientPromise;
  const db = client.db();
  let query: any = {};
  if (mentorId) query.mentorId = mentorId;
  if (mentorEmail) query.mentorEmail = mentorEmail;
  const sessions = await db.collection("sessions").find(query).sort({ date: 1, time: 1 }).toArray();
  return NextResponse.json(sessions);
}

// POST: Create a new session request
export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();
  // Optionally, add mentorEmail for easier lookup
  let mentorEmail = body.mentorEmail;
  if (!mentorEmail && body.mentorId) {
    const mentor = await db.collection("mentors").findOne({ _id: new ObjectId(body.mentorId) });
    mentorEmail = mentor?.email;
  }
  const session = {
    ...body,
    mentorEmail,
    createdAt: new Date(),
    status: body.status || "pending",
    meetLink: null,
  };
  await db.collection("sessions").insertOne(session);
  return NextResponse.json({ success: true });
}

// TypeScript types for Google Meet event creation
type MeetEventParams = {
  summary: string;
  description: string;
  start: string;
  end: string;
  attendees: string[];
};

// Function to create a Google Meet event using Google Calendar API
async function createGoogleMeetEvent({ summary, description, start, end, attendees }: MeetEventParams): Promise<string | undefined> {
  const CREDENTIALS_PATH = path.join(process.cwd(), "lib/google-service-account.json");
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  const SCOPES = ["https://www.googleapis.com/auth/calendar"];
  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    SCOPES
  );
  const calendar = google.calendar({ version: "v3", auth });
  // IMPORTANT: Use your real calendar's email address here, not 'primary'
  const calendarId = "your-real-gmail@gmail.com"; // <-- CHANGE THIS to your calendar's email
  const event = {
    summary,
    description,
    start: { dateTime: start, timeZone: "Asia/Kolkata" },
    end: { dateTime: end, timeZone: "Asia/Kolkata" },
    attendees: attendees.map((email: string) => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(2),
        conferenceSolutionKey: { type: "hangoutsMeet" }
      }
    }
  };
  const response = await calendar.events.insert({
    calendarId: calendarId,
    requestBody: event,
    conferenceDataVersion: 1,
    sendUpdates: "all"
  });
  const uri = response.data.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === "video")?.uri;
  return uri ?? undefined;
}

// PUT: Update session status (confirm/deny) and add Google Meet link if confirmed
export async function PUT(req: NextRequest) {
  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  const client = await clientPromise;
  const db = client.db();
  let meetLink = null;
  let session = await db.collection("sessions").findOne({ _id: new ObjectId(id) });
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });
  if (status === "confirmed") {
    // Create a Google Meet event and get the meet link
    meetLink = await createGoogleMeetEvent({
      summary: `Mentorship Session: ${session.subject}`,
      description: `Session between ${session.studentName} and ${session.mentorName}`,
      start: session.startTime, // ISO string
      end: session.endTime,     // ISO string
      attendees: [session.email, session.mentorEmail]
    });
    // Send email to both student and mentor (ensure both emails are present)
    const recipients = [];
    if (session.email) recipients.push(session.email);
    if (session.mentorEmail) recipients.push(session.mentorEmail);
    const mailBody = {
      to: recipients,
      subject: "Session Confirmed - Google Meet Link",
      text: `Your session has been confirmed! Join here: ${meetLink}`,
      html: `<p>Your session has been confirmed!<br>Join here: <a href='${meetLink}'>${meetLink}</a></p>`
    };
    // Fire and forget (do not block response)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailBody)
    });
    await db.collection("sessions").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, meetLink } }
    );
    return NextResponse.json({ success: true, meetLink });
  }
  await db.collection("sessions").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );
  return NextResponse.json({ success: true });
}
