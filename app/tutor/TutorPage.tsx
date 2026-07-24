'use client';

import Link from "next/link";
import { Star } from "lucide-react";
import { User } from "@/lib/models";
import { useRouter } from "next/navigation";
import { formatDateStampUTC, formatTimestampUTC } from "@/util/time";
import { useState } from "react";

interface UserBookings {
    id: number,
    tutorId: number,
    studentId: number,
    profileImage: string,
    studentFirstName: string,
    start: Date,
    chatId?: number,
}

interface TutorPageProps {
    user: User;
    avgRating: number;
    bookings: UserBookings[];
}

export default function TutorPage({ user, bookings, avgRating }: TutorPageProps) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false); 

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

    const handleCancelLesson = () => {
        try {
            /*  setLoadingId(lessonId);
             await cancelLessonApi(lessonId);
             setLocalBookings(localBookings.filter(b => b.id !== lessonId)); */
            setShowModal(true);
        } catch (err) {
            console.error(err);
            alert("Failed to cancel lesson. Please try again.");
        } finally {
            // setLoadingId(null);
        }
    };


    function handleChat(chatId: number) {
        router.push("/chat/" + chatId)
    }

    return (
        <div className=" px-6 text-gray-800 bg-gray-200">
            <main className="max-w-4xl mx-auto">
                <div className="grid sm:grid-cols-2 items-start">

                    {/* Header */}
                    <section className="mb-10">
                        <h1 className="text-3xl font-bold mb-4">Tutor Dashboard</h1>
                        <p className="text-gray-600 mb-6">
                            <span className="text-lg">Welcome back, <b>{user.firstName}</b>.</span>
                        </p>
                        <Link
                            data-testid='edit-tutor-profile-button-pw'
                            href="/tutor/edit"
                            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                            Edit Tutor Profile
                        </Link>
                    </section>

                    {/* Stats */}
                    <section className="flex mb-10 gap-3 justify-start sm:justify-end">

                        <div className="flex flex-col p-5 border border-gray-800 rounded-lg text-center items-center">
                            <div className="flex items-center">
                                <span className="text-2xl font-semibold mr-1">{avgRating.toFixed(1)}</span>
                                <Star />
                            </div>
                            <p className="text-gray-500 text-sm">Rating</p>
                        </div>

                        <div className="p-5 border border-gray-800 rounded-lg text-center">
                            <p className="text-2xl font-semibold">${user.tutorProfile.hourlyRate}/hr</p>
                            <p className="text-gray-500 text-sm">Hourly Rate</p>
                        </div>

                    </section>

                </div>



                {/* Upcoming Lesson */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-3">Upcoming Lessons</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {bookings.length > 0 ? bookings.map((b) => {
                            const profileImage = getPlaceholderImage(b.studentFirstName)
                            return <div key={b.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
                                <div className="flex items-center relative">
                                    <img
                                        src={b.profileImage ? b.profileImage : profileImage}
                                        alt="Tutor"
                                        className="w-24 h-24 rounded-lg object-cover"
                                    />

                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold">{b.studentFirstName}</h2>
                                        <span className="rounded-full text-xs bg-gray-800 font-semibold text-gray-200 px-2 py-1">STUDENT</span>
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
                                                Are you sure you want to cancel this lesson with <span className="font-semibold">{b.studentFirstName}</span>?
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
                                                    onClick={() => handleCancelLesson()}
                                                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    Yes, Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        }) : (
                            <p className="text-gray-600">No upcoming lessons.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

interface Booking {
    id: string;
    studentFirstName: string;
    profileImage?: string;
    start: Date;
    chatId?: string;
}

interface Props {
    bookings: Booking[];
    handleChat: (chatId: string) => void;
    cancelLessonApi: (lessonId: string) => Promise<void>; // your API function
}

function UpcomingLessons({ bookings, handleChat, cancelLessonApi }: Props) {
    const [showModal, setShowModal] = useState<string | null>(null); // store booking id for modal
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [localBookings, setLocalBookings] = useState(bookings);

    const handleCancelLesson = async (lessonId: string) => {
        try {
            setLoadingId(lessonId);
            await cancelLessonApi(lessonId);
            setLocalBookings(localBookings.filter(b => b.id !== lessonId));
            setShowModal(null);
        } catch (err) {
            console.error(err);
            alert("Failed to cancel lesson. Please try again.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Upcoming Lessons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localBookings.length > 0 ? localBookings.map(b => {
                    const profileImage = b.profileImage; // or your placeholder logic
                    return (
                        <div key={b.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition relative">
                            <div className="flex items-center">
                                <img
                                    src={profileImage}
                                    alt="Tutor"
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold">{b.studentFirstName}</h2>
                                    <span className="rounded-full text-xs bg-gray-800 font-semibold text-gray-200 px-2 py-1">
                                        STUDENT
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-gray-700">
                                <p><strong>Date:</strong> {b.start.toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {b.start.toLocaleTimeString()}</p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleChat(b.chatId!)}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Message
                                </button>

                                <button
                                    onClick={() => setShowModal(b.id)}
                                    className="flex-1 bg-red-200 py-2 rounded-lg hover:bg-gray-300 transition"
                                    disabled={loadingId === b.id}
                                >
                                    {loadingId === b.id ? "Cancelling..." : "Cancel"}
                                </button>
                            </div>

                            {/* Confirmation Modal */}
                            {showModal === b.id && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                        <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
                                        <p className="mb-6">
                                            Are you sure you want to cancel this lesson with {b.studentFirstName}?
                                        </p>
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => setShowModal(null)}
                                                className="px-4 py-2 rounded bg-gray-200"
                                            >
                                                No
                                            </button>
                                            <button
                                                onClick={() => handleCancelLesson(b.id)}
                                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                            >
                                                Yes, Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                }) : (
                    <p className="text-gray-600">No upcoming lessons.</p>
                )}
            </div>
        </section>
    );
}


