// Gemini API key is now only used server-side via /api/gemini route. Do not use it on the client.

export async function geminiRequest({ prompt, type, context }: { prompt: string; type?: string; context?: any }) {
  // Always use the API route for server-side key protection
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, type, context }),
  });
  if (!res.ok) throw new Error("Gemini API error");
  return res.json();
}
