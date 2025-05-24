"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/admin-dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

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
            {loading ? "Loading..." : (stats?.pendingMentors || 0) === 0 ? (
              <span>No pending mentor applications.</span>
            ) : (
              <span>{stats.pendingMentors} pending mentor applications</span>
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
    </div>
  );
}
