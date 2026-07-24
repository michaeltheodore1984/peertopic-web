'use client';

import { User } from "@/lib/models";
import { useRouter } from "next/navigation";

interface UserBookings {
    id: number,
    tutorId: number,
    studentId: number,
    avatar: string,
    bookingId: number,
    tutorFirstName: string,
    start: Date,
}

interface TutorPageProps {
    user: User;
    bookings: UserBookings[];
}

export default function HistoryPage({ user, bookings }: TutorPageProps) {
    const router = useRouter();

    function handleReview(tutorId: number) {
        router.push('/review/' + tutorId)
    }

    function getInitials(firstName: string, lastName: string) {
        const firstInitial = firstName ? firstName[0].toUpperCase() : '';
        const lastInitial = lastName ? lastName[0].toUpperCase() : '';
        return firstInitial + lastInitial;
    }

    function getPlaceholderImage(tutorFirstName: string) {
        const svg = encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                  <circle cx="40" cy="40" r="40" fill="#48BB78" />
                  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
                    font-family="Arial, sans-serif" font-size="32" fill="white" font-weight="bold">
                    ${getInitials(tutorFirstName, user.lastName)}
                  </text>
                </svg>
                `)
        return `data:image/svg+xml,${svg}`;

    }

    return (
        <div className="py-6 text-gray-800 bg-gray-200 h-[100dvh]">
            <main className="max-w-2xl mx-auto">
                {/* Header */}
                <section className="mb-6">
                    <h1 className="text-xl font-bold mb-4">History</h1>
                </section>

                {/* Past lessons */}
                <section className="mb-10">
                    <h2 className="font-semibold mb-3">Past lessons</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {bookings.length > 0 ? bookings.map((b) => {
                            const profileImage = getPlaceholderImage(b.tutorFirstName)
                            return <div key={b.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
                                <div className="flex items-center relative">
                                    <img
                                        // src={b.avatar ? b.avatar : placeholderDataUri}
                                        src={profileImage}
                                        alt="Tutor"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />

                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold">{b.tutorFirstName}</h2>
                                        <span className="rounded-full text-xs bg-gray-800 font-semibold text-gray-200 px-2 py-1">TUTOR</span>
                                        {/* <p className="text-sm text-gray-600">Animation</p> */}
                                        {/* <p className="text-sm text-gray-600">Student: {studentName}</p> */}
                                    </div>

                                    <span
                                        className={`absolute right-0 top-0 text-xs px-2 py-1 rounded-md text-white`}
                                    >
                                        {/* {status.charAt(0).toUpperCase() + status.slice(1)} */}
                                    </span>
                                </div>

                                <div className="mt-4 text-sm text-gray-700">
                                    <p>
                                        <strong>Date:</strong> {b.start.toLocaleDateString([], {
                                            weekday: 'short',
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <p>
                                        <strong>Time:</strong> {b.start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })}
                                    </p>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    {b.bookingId !== b.id ?
                                        <button onClick={() => handleReview(b.tutorId)} className="flex-1 bg-green-300 py-2 rounded-lg hover:bg-gray-300 transition">
                                            Review
                                        </button> : <button className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-300 transition">
                                            Reviewed
                                        </button>}
                                </div>
                            </div>

                        }) : (
                            <p className="text-gray-800">No past lessons.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
