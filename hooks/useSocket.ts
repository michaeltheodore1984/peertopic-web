// hooks/useSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io("http://192.168.1.4:4000", {
      withCredentials: true, // ensures cookies get sent
    });

    socketInstance.on("connect", () => {
      console.log("✅ Connected to socket:", socketInstance.id);
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❎ Disconnected");
      setConnected(false);
    });

    socketInstance.on("message", (msg) => {
      console.log("💬 Message from server:", msg);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, connected };
}
