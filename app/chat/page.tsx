"use client";

import { Suspense } from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// For demo: get username from localStorage or fallback
function getUsername() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("edubridge-username") || "userA";
  }
  return "userA";
}

function getUserEmail() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("edubridge-user-email") || null;
  }
  return null;
}

export default function ChatPageWrapper() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatPage />
    </Suspense>
  );
}

function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mentorEmail = searchParams.get("mentor");
  const studentEmail = searchParams.get("student") || localStorage.getItem("edubridge-user-email");
  // Use the same groupId logic for both mentor and student
  const groupId = `${studentEmail}__${mentorEmail}`;

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch(`/api/chat?groupId=${groupId}`);
      const data = await res.json();
      setMessages(data);
    }
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Poll every 2s
    return () => clearInterval(interval);
  }, [groupId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    // Sender can be either mentor or student
    const sender = localStorage.getItem("edubridge-user-email");
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId, sender, text: newMessage }),
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
          <span className="font-semibold text-lg text-blue-700">Study Group Chat</span>
        </div>
        <Button variant="ghost" onClick={() => router.back()} className="text-blue-500">Back</Button>
      </div>
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 md:px-0 py-6 w-full max-w-2xl mx-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet. Start the conversation!</div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message) => {
              const isSender = message.sender === studentEmail;
              return (
                <div
                  key={message._id || message.id}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col items-${isSender ? "end" : "start"} max-w-[80%] md:max-w-[60%]`}>
                    <span className={`text-xs font-semibold mb-1 ${isSender ? "text-blue-700" : "text-green-700"}`}>{message.sender}</span>
                    {message.fileUrl && message.fileType === "image" && (
                      <img src={message.fileUrl} alt="sent-img" className="rounded-lg mb-2 max-w-xs max-h-60 border border-gray-200" />
                    )}
                    {message.fileUrl && message.fileType === "file" && (
                      <a href={message.fileUrl} download={message.fileName} className="text-xs text-blue-600 underline mb-2" target="_blank" rel="noopener noreferrer">
                        {message.fileName || "Download file"}
                      </a>
                    )}
                    {message.text && (
                      <div
                        className={`rounded-2xl px-5 py-3 shadow-lg text-base font-medium break-words whitespace-pre-line ${
                          isSender
                            ? "bg-blue-100 text-black rounded-br-none border border-blue-300"
                            : "bg-green-100 text-black rounded-bl-none border border-green-300"
                        }`}
                      >
                        {message.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>
      {/* Input Bar */}
      <div className="flex items-center gap-2 p-4 bg-white border-t shadow-md sticky bottom-0 z-10 w-full max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-full border-2 border-blue-200 focus:border-blue-400 px-4 py-2 bg-gray-50"
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
        />
        <Button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
