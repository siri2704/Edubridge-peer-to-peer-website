"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pendingMentors, setPendingMentors] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin-dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
    fetch("/api/mentors?status=pending")
      .then((res) => res.json())
      .then((data) => {
        setPendingMentors(Array.isArray(data.mentors) ? data.mentors : []);
        setLoading(false);
      });
  }, []);

  const handleMentorAction = (mentorId: string, action: "approved" | "declined") => {
    fetch(`/api/mentors`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: mentorId, status: action }),
    })
      .then((res) => res.json())
      .then(() => {
        setPendingMentors((prev) => prev.filter((mentor: any) => mentor._id !== mentorId));
        setSelectedMentor(null);
        setStats((prevStats: any) => ({
          ...prevStats,
          pendingMentors: (prevStats?.pendingMentors || 1) - 1,
        }));
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="admin">👤</span> Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span role="img" aria-label="pending">🧑‍🏫</span> Pending Mentor Applications
          </h2>
          <div>
            {loading ? "Loading..." : pendingMentors.length === 0 ? (
              <span>No pending mentor applications.</span>
            ) : (
              <ul className="space-y-2">
                {pendingMentors.map((mentor: any) => (
                  <li key={mentor._id} className="flex justify-between items-center">
                    <span>{mentor.name} - {mentor.email}</span>
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => setSelectedMentor(mentor)}
                      >
                        Review
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span role="img" aria-label="overview">🧑‍💻</span> Platform Overview
          </h2>
          <ul className="space-y-2">
            <li>👥 Total Users: <b>{loading ? "..." : stats?.users}</b></li>
            <li>🧑‍🏫 Pending Mentors: <b>{loading ? "..." : stats?.pendingMentors}</b></li>
            <li>✅ Approved Mentors: <b>{loading ? "..." : stats?.approvedMentors}</b></li>
            <li>📚 Active Study Groups: <b>{loading ? "..." : stats?.studyGroups?.length}</b></li>
            <li>📄 Resources Shared: <b>{loading ? "..." : stats?.resources?.length}</b></li>
            <li>📅 Sessions Booked: <b>{loading ? "..." : stats?.sessions}</b></li>
          </ul>
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Study Groups:</h3>
            <ul className="text-sm list-disc ml-6">
              {stats?.studyGroups?.map((g: any) => (
                <li key={g._id}>{g.name} - {g.description}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4 mb-1">Resources:</h3>
            <ul className="text-sm list-disc ml-6">
              {stats?.resources?.map((r: any) => (
                <li key={r._id}>{r.title} - {r.tags?.join(", ")}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span role="img" aria-label="actions">🔑</span> Admin Actions
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Review and approve/decline mentor applications.</li>
          <li>Monitor platform statistics and user activity.</li>
          <li>Manage users and mentors (coming soon).</li>
          <li>View reports and feedback (coming soon).</li>
        </ul>
      </div>
      {/* Mentor Review Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">Mentor Application Review</h2>
            <div className="mb-4">
              <div className="mb-2"><b>Name:</b> {selectedMentor.name}</div>
              <div className="mb-2"><b>Email:</b> {selectedMentor.email}</div>
              <div className="mb-2"><b>Subject:</b> {selectedMentor.subject}</div>
              <div className="mb-2"><b>Qualification:</b> {selectedMentor.qualification}</div>
              <div className="mb-2"><b>Description:</b> {selectedMentor.description}</div>
            </div>
            <div className="flex gap-4 justify-center mt-6">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
                onClick={() => handleMentorAction(selectedMentor._id, "approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded font-semibold"
                onClick={() => handleMentorAction(selectedMentor._id, "declined")}
              >
                Deny
              </button>
              <button
                className="bg-gray-400 text-black dark:text-white px-4 py-2 rounded font-semibold"
                onClick={() => setSelectedMentor(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
