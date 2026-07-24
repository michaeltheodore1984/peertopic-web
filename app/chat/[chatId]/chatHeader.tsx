"use client";

import TutorBookingCalendar from "@/components/TutorBookingCalendar";
import { closeChat } from "@/lib/actions";
import { Tutor, User } from "@/lib/models";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ChatHeaderProps {
    otherUser: User;
    chatId: number;
}

function getInitials(firstName: string, lastName: string) {
    const firstInitial = firstName ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName ? lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
}

export default function ChatHeader({ otherUser, chatId }: ChatHeaderProps) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const placeholderSVG = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
          <circle cx="40" cy="40" r="40" fill="#48BB78" />
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
            font-family="Arial, sans-serif" font-size="32" fill="white" font-weight="bold">
            ${getInitials(otherUser.firstName, otherUser.lastName)}
          </text>
        </svg>
        `);
    const placeholderDataUri = `data:image/svg+xml,${placeholderSVG}`;

    function handleBack() {
        router.back();
    }

    const studentName = otherUser.firstName;
    function onReport() {
        router.push('/report/' + chatId)
    }

    async function onCloseChat() {
        await closeChat(chatId);
    }

    return (
        <div className="tutor-info flex items-center py-2 justify-between">
            <div onClick={handleBack} className="flex items-center">
                <div className="flex items-center">
                    <ArrowLeft className="text-gray-800 cursor-pointer" />
                    <img
                        src={otherUser.profileImage ? otherUser.profileImage.url : placeholderDataUri}
                        alt={otherUser.profileImage ? otherUser.profileImage.url : 'user avatar'}
                        className="w-12 h-12 mr-2 rounded-full border cursor-pointer"
                    />
                    <div>
                        <h2 className="text-lg text-black font-semibold">{otherUser.firstName}</h2>
                    </div>
                </div>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-gray-500 rounded p-2 cursor-pointer">
                <Menu />
            </button>
            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-80 p-6 rounded-lg shadow-xl text-gray-800">

                        <h2 className="text-xl font-semibold mb-4">
                            Chat Options
                        </h2>

                        <p className="text-gray-700 mb-6">
                            What would you like to do regarding your chat with <strong>{studentName}</strong>?
                        </p>

                        <div className="flex flex-col gap-3">

                            {/* Report Juan */}
                            <button
                                onClick={onReport}
                                className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                Report {studentName}
                            </button>

                            {/* Close Chat */}
                            <button
                                onClick={onCloseChat}
                                className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Close Chat
                            </button>

                            {/* Cancel */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                            >
                                Go back
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

type Booking = {
    id: string;
    studentName: string;
    time: string;
    date: string; // YYYY-MM-DD
};

// Dummy booking data
const bookings: Booking[] = [
    { id: "1", studentName: "Alice", time: "10:00", date: "2025-01-03" },
    { id: "2", studentName: "Bob", time: "11:00", date: "2025-01-03" },
    { id: "3", studentName: "Charlie", time: "14:00", date: "2025-01-03" },

    { id: "4", studentName: "David", time: "09:00", date: "2025-11-20" },
    { id: "5", studentName: "Emma", time: "13:00", date: "2025-01-10" },
];

type ChildProps = {
    setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

function TutorCalendar({ setShowCalendar }: ChildProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Format date to YYYY-MM-DD
    const format = (d: Date) => d.toISOString().split("T")[0];

    // Get bookings for selected date (max 3)
    const selectedBookings = bookings
        .filter((b) => b.date === format(selectedDate))
        .slice(0, 3);

    // Mark days that have bookings
    const tileContent = ({ date }: { date: Date }) => {
        const count = bookings.filter((b) => b.date === format(date)).length;
        if (count === 0) return null;

        return (
            <div
                style={{
                    marginTop: 4,
                    fontSize: 14,
                    background: "#d1e7ff",
                    padding: "4px",
                    borderRadius: 4,
                    textAlign: "center",
                    color: "black",
                }}
            >
                {count}
            </div>
        );
    };

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tutor Booking Calendar</h2>
                <button onClick={() => setShowCalendar(false)}>
                    <X size={24} color="currentColor" />
                </button>
            </div>

            <Calendar
                onChange={(value) => setSelectedDate(value as Date)}
                value={selectedDate}
                tileContent={tileContent}
            />

            <div style={{ marginTop: 20 }}>
                <h3 className="text-lg font-semibold">
                    Bookings for {selectedDate.toDateString()}
                </h3>

                {selectedBookings.length === 0 && (
                    <p className="text-gray-500 mt-2">No bookings.</p>
                )}

                {selectedBookings.map((b) => (
                    <div
                        key={b.id}
                        style={{
                            padding: "10px 12px",
                            marginTop: 10,
                            background: "#f5f5f5",
                            borderRadius: 6,
                        }}
                    >
                        <strong>{b.time}</strong> — {b.studentName}
                    </div>
                ))}
            </div>
        </div>
    );
}
