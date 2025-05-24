import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mentorId = searchParams.get("mentorId");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const studentEmail = localStorage.getItem("edubridge-user-email");
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mentorId,
        email: studentEmail, // use 'email' instead of 'studentEmail'
        date,
        time,
        topic,
        status: "pending",
      }),
    });
    setLoading(false);
    if (res.ok) setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Session Request Sent!</h2>
          <p className="text-lg text-gray-300 mb-4">Your session request has been sent to the mentor. You will be notified once it is confirmed or denied.</p>
          <Button onClick={() => router.push("/mentors")}>Back to Find Mentors</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Set Up a Session</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="topic" className="text-sm font-medium">Topic</label>
            <Input id="topic" name="topic" value={topic} onChange={e => setTopic(e.target.value)} required className="bg-black text-white border-gray-700 focus:border-white" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <Input id="date" name="date" type="date" value={date} onChange={e => setDate(e.target.value)} required className="bg-black text-white border-gray-700 focus:border-white" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="time" className="text-sm font-medium">Time</label>
            <Input id="time" name="time" type="time" value={time} onChange={e => setTime(e.target.value)} required className="bg-black text-white border-gray-700 focus:border-white" />
          </div>
          <Button type="submit" className="bg-white text-black font-bold mt-2" disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}