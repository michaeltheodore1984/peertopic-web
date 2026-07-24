// app/chat/[chatId]/ChatRoom.tsx
'use client';

import MessageTime from '@/components/messageTime';
import { useSocket } from '@/context/socketContext';
import { User } from '@/lib/models';
import { useEffect, useState } from 'react';

interface RemoteMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  timestamp: number;
  firstNameSender: string;
}

interface ChatRoomProps {
  chatId: number;
  initialMessages: RemoteMessage[];
  sender?: User | null;
}

// let socket: Socket;

export default function ChatRoom({ chatId, initialMessages, sender }: ChatRoomProps) {
  const [messages, setMessages] = useState<RemoteMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();

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
    if (!socket) return;
    if (!newMessage.trim()) return;

    socket.emit('sendMessage', {
      chatId,
      content: newMessage,
      senderFirstName: sender?.firstName,
    });

    setNewMessage('');
  };

  return (
    <main className='h-[60vh]'>
      <section className="h-[60vh] overflow-auto p-6 flex flex-col space-y-2 bg-gray-100">
        {messages.map((msg: RemoteMessage) => (
          <div
            key={msg.id}
            className={`inline-block p-2 rounded break-words 
                  ${Number(msg.senderId) === Number(sender?.id) ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}
            style={{ maxWidth: '75%' }}
          >
            <span className="font-semibold">{msg.firstNameSender}: </span>
            <span>{msg.content}</span>
            <div className="text-xs text-gray-500 mt-1 text-right">
              <MessageTime stamp={msg.timestamp} />
            </div>
          </div>
        ))}
      </section>


      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          placeholder='Type a message...'
          onChange={e => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-400 mr-4"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </main>
  );
}
