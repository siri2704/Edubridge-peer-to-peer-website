"use client";

import { useState, useRef } from "react";
import { geminiRequest } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";

export default function AIAssistantPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm your EduBridge AI Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);
    setInput("");
    try {
      const res = await geminiRequest({ prompt: input, type: "chat" });
      const aiText = res?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, something went wrong." }]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center py-8 px-2 ${isDark ? "bg-gradient-to-br from-blue-950 via-black to-green-950" : "bg-white"}`}>
      <div className={`w-full max-w-xl ${isDark ? "bg-[#18181b] border-gray-800" : "bg-white border-gray-200"} rounded-3xl shadow-2xl border flex flex-col h-[80vh]`}>
        <div className={`flex items-center justify-center gap-2 py-4 border-b ${isDark ? "border-gray-800 bg-[#23232a]" : "border-gray-200 bg-gray-100"} rounded-t-3xl`}>
          <img src="/placeholder-logo.svg" alt="AI Assistant" className="w-8 h-8" />
          <span className={`text-lg font-bold tracking-wide ${isDark ? "text-blue-300" : "text-blue-700"}`}>EduBridge AI Assistant</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-5 py-3 rounded-2xl max-w-[80%] whitespace-pre-line shadow transition-all duration-200
                ${msg.sender === "user"
                  ? isDark
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-br-none border border-blue-400"
                    : "bg-blue-100 text-blue-900 rounded-br-none border border-blue-300"
                  : isDark
                    ? "bg-gradient-to-r from-gray-800 to-gray-700 text-blue-100 rounded-bl-none border border-gray-700"
                    : "bg-gray-200 text-gray-800 rounded-bl-none border border-gray-300"}
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className={`p-4 border-t flex gap-2 rounded-b-3xl ${isDark ? "border-gray-800 bg-[#18181b]" : "border-gray-200 bg-white"}`}>
          <Input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className={`flex-1 rounded-full border-2 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${isDark ? "border-blue-700 bg-black text-blue-100" : "border-blue-300 bg-white text-black"}`}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            disabled={loading}
            autoFocus
          />
          <Button
            onClick={handleSend}
            className={`rounded-full font-semibold px-6 py-2 shadow-lg transition ${isDark ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
            disabled={loading}
          >
            {loading ? <span className="animate-pulse">...</span> : "Send"}
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #23232a;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
