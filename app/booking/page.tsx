"use client";

import { useState, useEffect, useRef } from "react";

interface Tutor {
  id: string;
  name: string;
  avatar: string;
  hourlyRate: number;
  topics: string[];
}

interface Message {
  id: string;
  sender: "peer" | "tutor";
  text: string;
  timestamp: string;
}

export default function ChatPageBooking() {
    const [selectedDate, setSelectedDate] = useState("");
  const tutor: Tutor = {
    id: "1",
    name: "Annie",
    avatar: "https://i.pravatar.cc/150?img=3",
    hourlyRate: 9,
    topics: ["PHP", "Java", "Python"],
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "tutor",
      text: "Hi! What topic would you like to learn today?",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      sender: "peer",
      text: "Hi Annie! I want to learn PHP.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: `${Date.now()}`,
      sender: "peer",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now() + 1}`,
          sender: "tutor",
          text: "Got it! Let's schedule a lesson soon.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-page flex flex-col h-screen max-h-screen p-4 bg-[#f0ead6] text-gray-800">
      {/* Tutor info */}
      <div className="tutor-info flex items-center gap-4 mb-4">
        <img
          src={tutor.avatar}
          alt={tutor.name}
          className="w-12 h-12 rounded-full border-2 border-[#d4c49d]"
        />
        <div>
          <h2 className="text-lg font-semibold">{tutor.name}</h2>
          <p className="text-sm text-gray-700">Topics: {tutor.topics.join(", ")}</p>
          <p className="text-sm text-gray-700">Hourly rate: ${tutor.hourlyRate}</p>
        </div>
        {/* Date picker */}
        <label className="block mb-3 text-sm font-medium text-gray-700">
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="block w-full mt-1 border border-[#d4c49d] rounded px-3 py-2 bg-[#fffaf0] focus:outline-none focus:ring-2 focus:ring-[#d4c49d]"
          />
        </label>
      </div>

      {/* Chat messages */}
      <div className="chat-box flex-1 overflow-y-auto border border-[#d4c49d] rounded p-4 mb-4 bg-[#fffaf0]">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Start the conversation!</p>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              className={`mb-2 flex ${msg.sender === "peer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs ${
                  msg.sender === "peer"
                    ? "bg-[#d4c49d] text-gray-900"
                    : "bg-[#e6dfc5] text-gray-800"
                }`}
              >
                {msg.text}
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-[#d4c49d] rounded px-3 py-2 bg-[#fffaf0]"
          placeholder="Type your message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-[#d4c49d] text-gray-900 px-4 py-2 rounded hover:bg-[#c2b47d]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
