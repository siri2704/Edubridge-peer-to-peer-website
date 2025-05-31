import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

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
  const calendarId = "siri-769@youtube-transcriber-454006.iam.gserviceaccount.com"; // <-- CHANGED to your real calendar's email
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

async function sendSessionMail({ to, subject, text, html }: { to: string[], subject: string, text: string, html: string }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sdouble698@gmail.com",
      pass: "utkd mnnj ioks phtg"
    }
  });
  await transporter.sendMail({
    from: 'EduBridge <sdouble698@gmail.com>',
    to,
    subject,
    text,
    html
  });
}

// PUT: Update session status (confirm/deny) and add Google Meet link if confirmed
export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const session = await db.collection("sessions").findOne({ _id: new ObjectId(id) });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // In the PUT handler, before calling createGoogleMeetEvent, build start and end as ISO strings
    let meetLink = null;
    if (status === "confirmed") {
      try {
        // Parse date and time from session
        // Fallback to today if missing
        const date = session.date || new Date().toISOString().slice(0, 10);
        const time = session.time || "12:00";
        // Assume 1 hour session
        const startDateTime = new Date(`${date}T${time}:00+05:30`);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
        meetLink = await createGoogleMeetEvent({
          summary: `Mentorship Session: ${session.topic}`,
          description: `Session between ${session.studentEmail} and ${session.mentorEmail}`,
          start: startDateTime.toISOString(),
          end: endDateTime.toISOString(),
          attendees: [session.studentEmail, session.mentorEmail],
        });
      } catch (error) {
        console.error("Error creating Google Meet link:", error);
      }
    }

    await db.collection("sessions").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, meetLink: "https://meet.google.com/rda-mqjq-viy" } }
    );

    // Send email to both mentor and student
    if (status === "confirmed") {
      const mentor = await db.collection("mentors").findOne({ email: session.mentorEmail });
      const studentEmail = session.studentEmail || session.email;
      const emails = [session.mentorEmail, studentEmail].filter(Boolean);
      const subject = `Session Confirmed: ${session.topic}`;
      const text = `Your session on '${session.topic}' is confirmed!\n\nJoin Google Meet: https://meet.google.com/rda-mqjq-viy`;
      const html = `<p>Your session on '<b>${session.topic}</b>' is confirmed!</p><p>Join Google Meet: <a href="https://meet.google.com/rda-mqjq-viy">https://meet.google.com/rda-mqjq-viy</a></p>`;
      await sendSessionMail({ to: emails, subject, text, html });
    }

    return NextResponse.json({ success: true, meetLink });
  } catch (error) {
    console.error("Error updating session status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
