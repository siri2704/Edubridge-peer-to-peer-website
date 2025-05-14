"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MentorApplyPage() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    description: "",
    qualification: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.subject || !form.description || !form.qualification) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/mentors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status: "pending" }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess("Application submitted! Await admin approval.");
      setForm({ name: "", subject: "", description: "", qualification: "" });
    } else {
      setError("Failed to submit application. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#18181b] p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 border border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Apply to be a Mentor</h2>
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="bg-black text-white border-gray-700 focus:border-blue-500"
        />
        <Input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="bg-black text-white border-gray-700 focus:border-blue-500"
        />
        <Textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          className="bg-black text-white border-gray-700 focus:border-blue-500 min-h-[80px]"
        />
        <Input
          name="qualification"
          placeholder="Qualification"
          value={form.qualification}
          onChange={handleChange}
          className="bg-black text-white border-gray-700 focus:border-blue-500"
        />
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        {success && <div className="text-green-400 text-sm text-center">{success}</div>}
        <Button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold py-2 mt-2"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Apply"}
        </Button>
      </form>
    </div>
  );
}
