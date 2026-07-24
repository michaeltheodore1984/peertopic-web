/* export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

console.log("Runtime:", process.release?.name);

import { Server as IOServer, Socket } from "socket.io";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest } from "next";

interface AuthenticatedSocket extends Socket {
  user?: Record<string, any>;
}

declare global {
  // eslint-disable-next-line no-var
  var io: IOServer | undefined;
}

export async function GET(request: Request) {
  // 👇 This only works on Node.js runtime
  const server = (request as any).socket?.server;

  if (!server) {
    console.error("❌ No underlying Node.js server found — are you on Edge?");
    return new Response("This API must run on the Node.js runtime", { status: 500 });
  }

  if (!globalThis.io) {
    console.log("🚀 Initializing Socket.IO server...");

    const io = new IOServer(server, {
      path: "/api/socket",
      cors: {
        origin: ["http://192.168.1.4:3000", "http://localhost:3000"],
        credentials: true,
      },
    });

    io.use(async (socket: AuthenticatedSocket, next) => {
      try {
        const cookieHeader = socket.request.headers.cookie || "";
        const token = await getToken({
          req: { headers: { cookie: cookieHeader } } as unknown as NextApiRequest,
          secret: process.env.NEXTAUTH_SECRET,
          secureCookie: process.env.NODE_ENV === "production",
        });

        if (!token) return next(new Error("Unauthorized"));
        socket.user = token;
        next();
      } catch (error) {
        console.error("❌ Auth error:", error);
        next(new Error("Unauthorized"));
      }
    });

    io.on("connection", (socket: AuthenticatedSocket) => {
      console.log("✅ Client connected:", socket.user);

      socket.on("message", (msg: string) => {
        console.log("📩 Message:", msg);
        socket.emit("message", `Echo: ${msg}`);
      });

      socket.on("disconnect", () => console.log("❎ Client disconnected"));
    });

    globalThis.io = io;
  }

  return new Response("Socket.IO server running", { status: 200 });
}
 */