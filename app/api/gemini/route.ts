import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, type, context } = await req.json();
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });

  // Use the Gemini 2.0 Flash model and v1beta endpoint
  let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
  let body: any = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  // Debugging: Log the incoming request payload
  console.log("Received prompt:", prompt);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) {
    console.error("Gemini API error:", data.error);
    return NextResponse.json({ error: data.error.message || "Gemini API error" }, { status: 500 });
  }
  // Debugging: Log the Gemini API response
  console.log("Gemini API response:", JSON.stringify(data, null, 2));
  return NextResponse.json(data);
}
