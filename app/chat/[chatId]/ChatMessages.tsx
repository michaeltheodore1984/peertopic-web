"use client";

interface RemoteMessage {
    id: number;
    chatId: number;
    senderId: number;
    content: string;
    timestamp: number;
    firstNameSender: string;
}

import { useSocket } from "@/context/socketContext";
import { User } from "@/lib/models";

interface Props {
    messageList: RemoteMessage[];
    sender?: User;
    chatId: number;
    otherUser: User;
}

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import ChatHeader from './chatHeader';

const ChatMessages: React.FC<Props> = ({ messageList, sender, chatId, otherUser }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<RemoteMessage[]>(messageList);
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const socket = useSocket();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTop = container.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if (!socket) return;
        socket.emit('joinChat', { chatId });

        socket.on('chatMessage', (msg: RemoteMessage) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, [socket, chatId]);

    const handleSend = () => {
        if (!socket || !newMessage.trim()) return;

        socket.emit('sendMessage', {
            chatId,
            content: newMessage,
            senderFirstName: sender?.firstName,
        });

        setNewMessage('');
    };

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Run after DOM finishes painting
        requestAnimationFrame(() => {
            const distanceFromBottom =
                container.scrollHeight - container.scrollTop - container.clientHeight;

            const isNearBottom = distanceFromBottom < 150; // bigger threshold fixes jumpy values

            if (isNearBottom) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: "smooth",
                });
            }
        });
    }, [messages]);

    return (
        <main className="flex flex-col h-[100dvh] px-2 pb-4">
            <ChatHeader otherUser={otherUser} chatId={chatId} />
            <section
                ref={containerRef}
                className="overflow-y-auto px-4 flex flex-col space-y-4 py-4 bg-gray-100 flex-grow">
                {messages.map(msg => (
                    <div
                        data-testid="chat-message-pw"
                        key={msg.id}
                        className={`inline-block p-2 rounded break-words 
                            ${Number(msg.senderId) === Number(sender?.id) ?
                                'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}
                        style={{ maxWidth: '75%' }}
                    >
                        <span className="font-semibold text-gray-800">{msg.firstNameSender}: </span>
                        <span className='text-gray-800'>{msg.content}</span>
                        <div className="text-xs text-gray-500 mt-1 text-right">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                                // check
                            })}
                        </div>
                    </div>
                ))}
            </section>

            <div className="mt-4 flex">
                <input
                    data-testid="chat-input-pw"
                    type="text"
                    value={newMessage}
                    placeholder="Type a message..."
                    onChange={e => setNewMessage(e.target.value)}
                    className="flex-1 p-2 rounded border border-gray-400 mr-2 text-gray-800"
                />
                <button data-testid="send-button-pw" onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Send
                </button>
            </div>
        </main>
    );
};

export default ChatMessages
