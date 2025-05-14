import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, type, context } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });

  // Use the Gemini 2.0 Flash model and v1beta endpoint as in your curl example
  let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
  let body: any = {
    contents: [{ parts: [{ text: prompt }] }],
  };
  // You can extend this logic for recommendations/content gen

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
  // Debug: log the full Gemini API response
  console.log("Gemini API response:", JSON.stringify(data, null, 2));
  return NextResponse.json(data);
}
