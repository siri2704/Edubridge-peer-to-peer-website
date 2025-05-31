import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const response = await fetch('/api/admin/mentor-requests');
      const data = await response.json();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  async function updateRequestStatus(id, status) {
    await fetch(`/api/admin/mentor-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setRequests(requests.filter((request) => request._id !== id));
  }

  return (
    <div>
      <h1>Pending Mentor Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.name} ({request.email})
            <button onClick={() => updateRequestStatus(request._id, 'approved')}>Approve</button>
            <button onClick={() => updateRequestStatus(request._id, 'denied')}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
}