// app/layout.tsx
import type { Metadata } from "next";
import { Comfortaa, Geist, Roboto } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/context/socketContext";
import { Footer } from "@/components/footer";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { uploadRouter } from "@/app/api/uploadthing/core";
import Header from "@/components/header";
import SessionHeaderWrapper from "@/components/sessionHeaderWrapper";
import SessionFooterWrapper from "@/components/sessionFooterWrapper";
import ClientRootLayout from "./ClientRootLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeerTopic",
  description: "Get paid to teach what you know.",
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={`${comfortaa.variable} antialiased`}>
        <main className="bg-gray-200">
          <ClientRootLayout>
            <SessionHeaderWrapper />
            <SocketProvider>
              {children}
            </SocketProvider>
            <SessionFooterWrapper />
          </ClientRootLayout>
        </main>
      </body>
    </html>
  );
}
/* export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch session server-side
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
        <HeaderWrapper session={session}>
          <SocketProvider>{children}</SocketProvider>
        </HeaderWrapper>
        <Footer />
      </body>
    </html>
  );
} */
