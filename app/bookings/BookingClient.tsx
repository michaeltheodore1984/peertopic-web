// 'use client';

// import { Booking } from "@/lib/models";
// import { useRouter } from "next/navigation";

// interface BookingClientProps {
//     bookings: Booking[];
// };

// export default function BookingsClient({ bookings }: BookingClientProps) {
//     const router = useRouter();

//     const upcoming = bookings.filter(b => new Date(b.start) >= new Date());
//     const past = bookings.filter(b => new Date(b.start) < new Date());

//     const formatDate = (dateStr: string) => {
//         const d = new Date(dateStr);
//         return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
//     };

//     const formatTime = (dateStr: string) => {
//         const d = new Date(dateStr);
//         return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     };

//     return (
//         <div className="max-w-3xl mx-auto py-8 px-6">

//             <h1 className="text-2xl font-bold mb-6">Your Lessons</h1>

//             {/* Upcoming */}
//             <section className="mb-10">
//                 <h2 className="text-xl font-semibold mb-3">Upcoming</h2>

//                 {upcoming.length === 0 && (
//                     <p className="text-gray-500">No upcoming lessons.</p>
//                 )}

//                 <div className="space-y-4">
//                     {upcoming.map(b => (
//                         <div
//                             key={b.id}
//                             className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
//                         >
//                             <div>
//                                 <p className="font-semibold">{b.user.firstName}</p>
//                                 <p className="text-gray-600 text-sm">
//                                     {formatDate(b.start)} — {formatTime(b.startTime)}
//                                 </p>
//                             </div>

//                             <button
//                                 onClick={() => router.push(`/bookings/${b.id}`)}
//                                 className="px-3 py-1 border rounded-lg text-sm"
//                             >
//                                 View
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Past */}
//             <section>
//                 <h2 className="text-xl font-semibold mb-3">Past</h2>

//                 {past.length === 0 && (
//                     <p className="text-gray-500">No past lessons.</p>
//                 )}

//                 <div className="space-y-4">
//                     {past.map(b => (
//                         <div
//                             key={b.id}
//                             className="p-4 border rounded-lg bg-gray-100 shadow-sm"
//                         >
//                             <p className="font-semibold">{b.tutorName}</p>
//                             <p className="text-gray-600 text-sm">
//                                 {formatDate(b.startTime)} — {formatTime(b.startTime)}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//         </div>
//     );
// }
