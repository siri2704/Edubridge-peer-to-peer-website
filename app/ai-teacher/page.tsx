"use client";

import React, { useState } from 'react';

export default function AITeacherPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      console.log('API Response:', data); // Debugging log
      if (data.error) {
        setResponse(`Error: ${data.error.message || 'Unknown error from API'}`);
      } else {
        setResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI Teacher.');
      }
    } catch (err) {
      console.error('Error contacting AI Teacher:', err); // Debugging log
      setResponse('Error contacting AI Teacher.');
    }
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">AI Teacher</h1>
      <p className="mb-6 text-center text-gray-300">Ask any question and get an instant, clear explanation and a suggested activity from your AI Teacher!</p>
      <form onSubmit={handleAsk} className="flex flex-col gap-4 mb-6">
        <textarea
          className="border border-gray-600 bg-gray-900 text-white rounded-lg p-3 text-base min-h-[80px] focus:outline-primary"
          placeholder="Type your question here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Asking...' : 'Ask AI Teacher'}
        </button>
      </form>
      {response && (
        <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 text-base text-white whitespace-pre-line">
          {response}
        </div>
      )}
    </div>
  );
}
