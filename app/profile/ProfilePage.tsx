'use client';

import Link from "next/link";
import { User } from "@/lib/models";
import { useRouter } from "next/navigation";
import { cancelBooking } from "@/lib/actions";
import { formatDateStampUTC, formatTimestampUTC } from "@/util/time";
import { useState } from "react";

interface StudentBooking {
    id: number;
    studentId: number;
    profileImage: string;
    tutorFirstName: string;
    start: Date;
    chatId?: number;
}

interface ProfileProps {
    user: User;
    bookings: StudentBooking[];
}

export default function ProfilePage({ user, bookings }: ProfileProps) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    function getInitials(firstName: string, lastName: string) {
        const firstInitial = firstName ? firstName[0].toUpperCase() : '';
        const lastInitial = lastName ? lastName[0].toUpperCase() : '';
        return firstInitial + lastInitial;
    }

    function getPlaceholderImage(tutorFirstName: string) {
        const svg = encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                  <rect width="80" height="80" rx="6" ry="6" fill="#48BB78" />
                  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
                    font-family="Arial, sans-serif" font-size="32" fill="white" font-weight="bold">
                    ${getInitials(tutorFirstName, user.lastName)}
                  </text>
                </svg>
                `)
        return `data:image/svg+xml,${svg}`;

    }

    function handleChat(chatId: number) {
        router.push("/chat/" + chatId)
    }

    async function handleCancel(bookingId: number) {
       await cancelBooking(bookingId);
    }

    return (
        <div className="max-w-3xl mx-auto py-6 px-6">
            {/* Header */}
            <section className="md:flex gap-6 mb-10">
                <img
                    src={user.profileImage ? user.profileImage.url : getPlaceholderImage(user.firstName)}
                    alt="Profile"
                    className="w-28 h-28 object-cover rounded-full border"
                />
                <div>

                    <div className="my-4">
                        <h1 className="text-3xl font-bold">
                            {user.firstName} {user.lastName}
                        </h1>
                        {/* <p className="text-gray-600 text-sm">{user.email}</p> */}
                    </div>

                    <Link
                        data-testid='edit-profile-button-pw'
                        href="/profile/edit"
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 mr-4"
                    >
                        Edit profile
                    </Link>
                    {user.tutorProfile ?
                        <Link
                            data-testid='tutor-dashboard-button-pw'
                            href="/tutor"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >

                            Tutor dashboard

                        </Link> : <Link
                            href="/tutor/apply"
                            className="text-blue-600 underline"
                        >
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Become a tutor
                            </button>
                        </Link>}
                </div>

            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-3">Your upcoming lessons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bookings.length > 0 ? bookings.map((b) => {
                        const profileImage = getPlaceholderImage(b.tutorFirstName)
                        return <div key={b.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
                            <div className="flex items-center relative">
                                <img
                                    src={b.profileImage ? b.profileImage : profileImage}
                                    alt="Tutor"
                                    className="w-24 h-24 rounded-lg object-cover"
                                />

                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold">{b.tutorFirstName}</h2>
                                    <span className="rounded-full text-xs bg-gray-800 font-semibold text-gray-200 px-2 py-1">TUTOR</span>
                                    <p className="text-sm text-gray-600 mt-2">Animation</p>
                                    {/* <p className="text-sm text-gray-600">Student: {studentName}</p> */}
                                </div>

                                <span
                                    className={`absolute right-0 top-0 text-xs px-2 py-1 rounded-md text-white`}
                                >

                                </span>
                            </div>

                            <div className="mt-4 text-sm text-gray-700">
                                <p>
                                    <strong>Date:</strong> {formatDateStampUTC(b.start.getTime())}
                                </p>
                                <p>
                                    <strong>Time:</strong> {formatTimestampUTC(b.start.getTime())}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">

                                <button onClick={() => handleChat(b.chatId!)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                    Message
                                </button>

                                <button onClick={() => setShowModal(true)} className="flex-1 bg-red-200 py-2 rounded-lg hover:bg-gray-300 transition">
                                    Cancel
                                </button>
                            </div>
                            {/* Confirmation Modal */}
                            {showModal && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-600/70 z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                        <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
                                        <p className="mb-6">
                                            Are you sure you want to cancel this lesson with <span className="font-semibold">{b.tutorFirstName}</span>?
                                            We'll let them know that you requested a cancellation.
                                        </p>
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => setShowModal(false)}
                                                className="px-4 py-2 rounded bg-gray-200"
                                            >
                                                No
                                            </button>
                                            <button
                                                onClick={() => handleCancel(b.id)}
                                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                            >
                                                Yes, Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }) : <div><p className="mb-6">No upcoming lessons.</p><Link
                        href="/explore"
                        className="px-4 py-2 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
                    >
                        Explore
                    </Link></div>}

                </div>
            </section>

        </div>
    );
}