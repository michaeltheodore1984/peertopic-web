'use client';

import MessageTime from '@/components/messageTime';
import { useSocket } from '@/context/socketContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RemoteMessage {
    id: number;
    chatId: number;
    senderId: number;
    firstNameSender: string;
    firstNameReceiver: string;
    content: string;
    timestamp: number;
}

interface MessagesPageProps {
    messages: RemoteMessage[];
    sender: string;
}

export function MessagesPage({ messages, sender }: MessagesPageProps) {
    const socket = useSocket();

    const [latestMessagesMap, setLatestMessagesMap] = useState<Record<string, RemoteMessage>>(() => {
        const map: Record<string, RemoteMessage> = {};
        messages.forEach((msg) => {
            const existing = map[msg.chatId];
            if (!existing || new Date(msg.timestamp) > new Date(existing.timestamp)) {
                map[msg.chatId] = msg;
            }
        });
        return map;
    });

    const handleNewMessage = (msg: RemoteMessage) => {
        setLatestMessagesMap((prev) => {
            const existing = prev[msg.chatId];
            if (!existing || new Date(msg.timestamp) > new Date(existing.timestamp)) {
                return { ...prev, [msg.chatId]: msg };
            }
            return prev;
        });
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('overviewUpdate', handleNewMessage);

        return () => {
            socket.off('overviewUpdate', handleNewMessage);
        };
    }, [socket]);

    const latestMessages = Object.values(latestMessagesMap).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
        <main data-testid="messages-pw" className="bg-gray-200 h-[100dvh] py-4">
            <div className="max-w-xl mx-auto px-4">
                <h1 className="text-lg font-bold mb-4 text-gray-800">Messages</h1>

                {latestMessages.length === 0 ? (
                    <p className="text-gray-600">No messages yet.</p>
                ) : (
                    <div className="space-y-4">
                        {latestMessages.map((msg: RemoteMessage) => (
                            <Link key={msg.id} href={`/chat/${msg.chatId}`} className="block">
                                <div className="bg-white p-4 rounded shadow hover:bg-gray-100 transition cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-800">{msg.firstNameSender}</span>
                                        <span className="text-sm text-gray-500">
                                            <MessageTime stamp={msg.timestamp} />
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mt-1 truncate">{msg.content}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                )}
            </div>
        </main>
    );
}
