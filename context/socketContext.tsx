"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface RemoteMessage {
  id: number;
  chatId: number;
  senderId: number;
  firstNameSender: string;
  firstNameReceiver: string;
  firstName: string;
  content: string;
  timestamp: number;
}

// Define the expected server-side events (optional but recommended for type safety)
interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  chatMessage: (data: RemoteMessage) => void;
  overviewUpdate: (data: RemoteMessage) => void;
  // Add more server → client events here if needed
  // message: (data: string) => void;
}

// Define the expected client-side events (optional)
interface ClientToServerEvents {
  // Add client → server events here if needed
  sendMessage: (data: { chatId: number; content: string; senderFirstName?: string }) => void;
  joinChat: (dat: { chatId: number }) => void;
}

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents> | null;

const SocketContext = createContext<SocketType>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<SocketType>(null);

  useEffect(() => {
    const socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://192.168.1.66:4000", {
      path: "/",
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      // console.log("Connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      // console.log("Disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketType => useContext(SocketContext);
