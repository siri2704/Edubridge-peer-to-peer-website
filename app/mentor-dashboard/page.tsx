"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Users, CheckCircle, XCircle, UserPlus, UserCheck, Award, Calendar } from "lucide-react";

export default function MentorDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [resources, setResources] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [sessionRequests, setSessionRequests] = useState<any[]>([]);
  const [sessionLoading, setSessionLoading] = useState(true);
  const mentorEmail = (typeof window !== "undefined") ? localStorage.getItem("edubridge-user-email") : null;

  useEffect(() => {
    const token = localStorage.getItem("edubridge-token");
    const role = localStorage.getItem("edubridge-role");
    if (!token || role !== "mentor") {
      router.push("/login");
    } else {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [router]);

  useEffect(() => {
    if (!mentorEmail) return;
    fetch(`/api/sessions?mentorEmail=${mentorEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setSessionRequests(Array.isArray(data) ? data : []);
        setSessionLoading(false);
      });
  }, [mentorEmail, sessionLoading]);

  const handleSessionAction = async (id: string, action: "confirmed" | "denied") => {
    setSessionLoading(true);
    const res = await fetch(`/api/sessions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: action }),
    });
    const data = await res.json();
    setSessionRequests((prev) => prev.map((s) => s._id === id ? { ...s, status: action, meetLink: data.meetLink } : s));
    setSessionLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your mentor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Mentor Dashboard" text="Welcome, mentor! Manage your sessions, mentees, and resources.">
        <Button onClick={() => router.push("/mentors/apply")}>Edit Profile</Button>
      </DashboardHeader>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pending Mentor Applications */}
        <div className="bg-[#18181b] rounded-2xl shadow-lg border border-gray-800 p-6 flex flex-col gap-4">
          {/* ...existing code... */}
        </div>
        {/* Session Requests */}
        <div className="bg-[#18181b] rounded-2xl shadow-lg border border-gray-800 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-semibold">Session Requests</h2>
          </div>
          {sessionLoading ? (
            <div className="text-gray-400">Loading session requests...</div>
          ) : sessionRequests.length === 0 ? (
            <div className="text-gray-400">No session requests.</div>
          ) : (
            <ul className="space-y-4">
              {sessionRequests.map((req) => (
                <li key={req._id} className="bg-[#23232a] rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-gray-700">
                  <div>
                    <div className="font-bold text-lg">{req.topic}</div>
                    <div className="text-gray-400">Student: {req.studentEmail}</div>
                    <div className="text-gray-400">Date: {req.date} Time: {req.time}</div>
                    <div className="text-gray-400">Status: {req.status}</div>
                    {req.meetLink && (
                      <div className="text-green-400 mt-2">Google Meet: <a href={req.meetLink} target="_blank" rel="noopener noreferrer" className="underline">Join Link</a></div>
                    )}
                  </div>
                  {req.status === "pending" && (
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button className="bg-green-700 hover:bg-green-800" onClick={() => handleSessionAction(req._id, "confirmed")}>Confirm</Button>
                      <Button className="bg-red-700 hover:bg-red-800" onClick={() => handleSessionAction(req._id, "denied")}>Deny</Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
