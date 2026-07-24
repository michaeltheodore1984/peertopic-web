"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import SessionHeader from "./sessionHeader";
import Header from "./header";

export default function SessionHeaderWrapper() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isChat = pathname.startsWith("/chat");

  if (isChat) return <></>;
  if (session) return <SessionHeader session={session} />;
  return <Header />;
}
