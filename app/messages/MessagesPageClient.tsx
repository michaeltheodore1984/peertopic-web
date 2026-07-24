// 'use client';

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import MessagesPage from "./MessagesPage"; // your interactive component
// import { MessageType } from "@/lib/types";

// interface Props {
//   messages: MessageType[];
//   senderId: number;
// }

// export default function MessagesPageClient({ messages, senderId }: Props) {
//   const router = useRouter();

//   useEffect(() => {
//     const handleShow = (event: PageTransitionEvent) => {
//       if (event.persisted) {
//         // Page restored from bfcache → refresh Server Component
//         router.refresh();
//       }
//     };

//     window.addEventListener("pageshow", handleShow);
//     return () => window.removeEventListener("pageshow", handleShow);
//   }, [router]);

//   return <MessagesPage messages={messages} sender={senderId} />;
// }
