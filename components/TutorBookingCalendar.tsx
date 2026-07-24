"use client";

import { createBooking, getBookingsForMonth } from "@/lib/actions";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const TUTOR_ID = 1; // replace with actual logged-in tutor ID
const STUDENT_ID = 2; // placeholder for demo, ideally dynamic
const SLOT_DURATION = 60; // minutes
const START_HOUR = 8;
const END_HOUR = 20;
const MAX_BOOKINGS_PER_DAY = 3;

type BookingSlot = {
    start: number; // timestamp
    end: number;   // timestamp
    tutorId: number;
    studentId: number;
};

export default function TutorCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [monthBookings, setMonthBookings] = useState<BookingSlot[]>([]);
    const [dayBookings, setDayBookings] = useState<BookingSlot[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // fetch bookings for the month from DB
    const fetchMonthBookings = async (date: Date) => {
        const data = await getBookingsForMonth(date.getFullYear(), date.getMonth());
        // ensure start/end are numbers
        const normalized = data.map(b => ({
            start: Number(b.start),
            end: Number(b.end),
            tutorId: Number(b.tutorId),
            studentId: Number(b.studentId)
        }));
        setMonthBookings(normalized);
    };

    // select a date
    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);

        const bookingsForDay = monthBookings.filter(b => {
            const bDate = new Date(b.start);
            return (
                bDate.getFullYear() === date.getFullYear() &&
                bDate.getMonth() === date.getMonth() &&
                bDate.getDate() === date.getDate()
            );
        });

        setDayBookings(bookingsForDay);
    };

    // handle calendar month navigation
    const handleActiveStartChange = (args: any) => {
        if (args.activeStartDate) {
            setCurrentMonth(args.activeStartDate);
        }
    };

    useEffect(() => {
        fetchMonthBookings(currentMonth);
    }, [currentMonth]);

    // book a slot
    const handleBookSlot = async (start: number, end: number) => {
        const slot: BookingSlot = { start, end, tutorId: TUTOR_ID, studentId: STUDENT_ID };
        try {
            await createBooking(slot.tutorId, slot.studentId, new Date(start), new Date(end));
            // update local state
            setDayBookings(prev => [...prev, slot]);
            setMonthBookings(prev => [...prev, slot]);
        } catch (err) {
            console.error("Failed to book slot:", err);
        }
    };

    // highlight days with bookings and check if tutor is at limit
    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === "month") {
            const bookingsForDay = monthBookings.filter(b => {
                const bDate = new Date(b.start);
                return (
                    bDate.getFullYear() === date.getFullYear() &&
                    bDate.getMonth() === date.getMonth() &&
                    bDate.getDate() === date.getDate()
                );
            });

            const tutorBookingsForDay = bookingsForDay.filter(b => b.tutorId === TUTOR_ID);
            if (tutorBookingsForDay.length >= MAX_BOOKINGS_PER_DAY) return "bg-red-200 rounded";
            if (bookingsForDay.length > 0) return "bg-yellow-200 rounded"; // optional: show other bookings
        }
        return "";
    };

    return (
        <div className="p-4">
            <Calendar
                onClickDay={handleSelectDate}
                tileContent={({ date, view }) => {
                    if (view === "month") {
                        const bookingsForDay = monthBookings.filter(b => {
                            const bDate = new Date(b.start);
                            return (
                                bDate.getFullYear() === date.getFullYear() &&
                                bDate.getMonth() === date.getMonth() &&
                                bDate.getDate() === date.getDate()
                            );
                        });

                        if (bookingsForDay.length > 0) {
                            return <div className="h-1 w-1 bg-red-600 rounded-full mx-auto mt-1"></div>;
                        }
                    }
                    return null;
                }}
            />


            {selectedDate && (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                    <h2 className="font-bold mb-2">
                        Available slots for {selectedDate.toDateString()}
                    </h2>

                    {(() => {
                        const tutorBookingsForDay = dayBookings.filter(b => b.tutorId === TUTOR_ID);
                        const isAtLimit = tutorBookingsForDay.length >= MAX_BOOKINGS_PER_DAY;

                        return (
                            <>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => {
                                        const start = new Date(selectedDate);
                                        start.setHours(START_HOUR + i, 0, 0, 0);
                                        const end = new Date(start.getTime() + SLOT_DURATION * 60 * 1000);

                                        const slotStart = start.getTime();
                                        const slotEnd = end.getTime();

                                        const isBooked = dayBookings.some(
                                            b => slotStart < b.end && slotEnd > b.start
                                        );

                                        return (
                                            <button
                                                key={slotStart}
                                                disabled={isBooked || isAtLimit}
                                                onClick={() => handleBookSlot(slotStart, slotEnd)}
                                                className={`px-3 py-1 rounded text-sm ${isBooked || isAtLimit
                                                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                                    : "bg-green-600 text-white hover:bg-green-700"
                                                    }`}
                                            >
                                                {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </button>
                                        );
                                    })}
                                </div>

                                {isAtLimit && (
                                    <p className="text-red-500 text-sm mt-2">
                                        You have reached the maximum of {MAX_BOOKINGS_PER_DAY} bookings for this day.
                                    </p>
                                )}
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
