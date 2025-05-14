export async function geminiRequest({ prompt, type, context }: { prompt: string; type?: string; context?: any }) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, type, context }),
  });
  if (!res.ok) throw new Error("Gemini API error");
  return res.json();
}
