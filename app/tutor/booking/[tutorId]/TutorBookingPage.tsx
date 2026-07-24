'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { tutorBookingData } from './dummyData';
import { Tutor, TutorTimeOff } from '@/lib/models';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { createBooking } from '@/lib/actions';
import toast, { Toaster } from 'react-hot-toast';


interface TutorPageProps {
    session: Session,
    tutor: Tutor;
    bookings: string[];
    tutorBookings: string[];
}

const defaultDailyHours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
]

const TutorBookingPage = ({ session, tutor, bookings, tutorBookings }: TutorPageProps) => {
    const tutorTimeOff = tutor?.timeOff.map((item: TutorTimeOff) => item.date.toString());
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [msgResult, setMsgResult] = useState('')
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const formatTime = (time: string) => {
        const [hour, minute] = time.split(":");
        const date = new Date();
        date.setHours(Number(hour), Number(minute));
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
        });
    };


    // Disable days with no available slots
    const tileDisabled = ({ date }: { date: Date }) => {
        const isoDate = date.toISOString().split("T")[0];
        return tutorTimeOff!.includes(isoDate);
    };

    const buildDateTimeString = (date: Date, time: string) => {
        const isoDate = date.toISOString().split("T")[0];
        return `${isoDate}T${time}`;
    };

    // Get available time slots for the selected day
    const getTimeSlotsForDay = () => {
        if (!selectedDate) return [];

        const isoDate = selectedDate.toISOString().split("T")[0];

        // If it's a day off → no slots at all
        if (tutorTimeOff?.includes(isoDate)) return [];

        return defaultDailyHours
            .map(time => {
                const iso = buildDateTimeString(selectedDate, time);
                return {
                    raw: time,          // "17:00", safe to parse
                    display: formatTime(time), // "5:00 PM", for UI
                    iso
                };
            })
            .filter(slot => !bookings.includes(slot.iso))
            .filter(slot => !tutorBookings.includes(slot.iso))
    };

    const combineDateAndTime = (date: Date, time: string): Date => {
        const [hour, minute] = time.split(":").map(Number);
        // Date.UTC creates the correct UTC date
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0));
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) return;
        const mysqlDateTime = combineDateAndTime(selectedDate, selectedTime);

        await createBooking(Number(tutor?.id), Number(session.user.id), mysqlDateTime);

        router.replace('/profile')
    };

    const handleSignIn = () => {
        router.push(`/signin?page=tutor/booking/${tutor?.id}`)
    }

    const handleBack = () => {
        router.back();
    }

    const bio = tutor.bio;

    const firstSpaceIndex = bio.indexOf(' ');
    const firstWord = bio.slice(0, firstSpaceIndex);
    const rest = bio.slice(firstSpaceIndex + 1);

    function getInitials(firstName?: string, lastName?: string) {
        const firstInitial = firstName ? firstName[0].toUpperCase() : '';
        const lastInitial = lastName ? lastName[0].toUpperCase() : '';
        return firstInitial + lastInitial;
    }

    const placeholderSVG = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
          <circle cx="40" cy="40" r="40" fill="#48BB78" />
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
            font-family="Arial, sans-serif" font-size="32" fill="white" font-weight="bold">
            ${getInitials(tutor?.user.firstName, tutor?.user.lastName)}
          </text>
        </svg>
        `);

    const placeholderDataUri = `data:image/svg+xml,${placeholderSVG}`;

    return (
        <div className="min-h-screen bg-gray-200 text-gray-800">
            <div className="max-w-3xl mx-auto py-6 px-6">
                {/* Tutor Info */}

                <div className='flex items-center'>
                    <img
                        src={tutor?.user.profileImage ? tutor.user.profileImage.url : placeholderDataUri}
                        alt={tutor?.user.firstName}
                        className='w-28 h-28 object-cover rounded-full border'
                    />
                    <div className='flex flex-col ml-4'>

                        <h1 className="text-2xl font-bold">
                            {tutor?.user.firstName}
                        </h1>

                        <div className='my-2 text-lg'>
                            ${tutor?.hourlyRate}/hour
                        </div>

                        {tutor?.topics?.map(topic => (
                            <button
                                key={topic.id}
                                className='px-3 py-1 rounded-full border text-sm self-start'>
                                {topic.name}
                            </button>
                        ))}

                    </div>

                </div>

                <p className='my-8 max-w-xl'>
                    <span className="font-bold">{firstWord}</span> {rest}
                </p>

                <div className='border-b border-gray-400 pb-2 mb-4'>
                    <h1 className='text-lg'>Book a lesson with {tutor.user.firstName}</h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 items-start'>
                    <div>
                        <h2 className='font-semibold mb-4'>{!selectedDate ? 'Select a Date' : <span className='bg-blue-300 px-4 py-2 rounded-full'>{selectedDate.toString().substring(0, selectedDate.toString().indexOf('00'))}</span>}</h2>
                        {session &&
                            selectedDate ? (
                            <div className='mb-4 max-w-xl'>
                                <h2 className='font-semibold mb-2'>Select a Time</h2>
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    {getTimeSlotsForDay().length > 0 ? (
                                        getTimeSlotsForDay().map(slot => (
                                            <button
                                                key={slot.raw}
                                                onClick={() => setSelectedTime(slot.raw)} // store raw for MySQL
                                                style={{
                                                    padding: '10px 15px',
                                                    backgroundColor: selectedTime === slot.raw ? '#4caf50' : '#f0f0f0',
                                                    color: selectedTime === slot.raw ? '#fff' : '#000',
                                                    border: '1px solid #ccc',
                                                    borderRadius: 5,
                                                    cursor: 'pointer',
                                                }}>
                                                {slot.display}
                                            </button>
                                        ))
                                    ) : (
                                        <p>No available time slots on this day.</p>
                                    )}

                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 my-4">{session ? 'No date selected.' : 'Please log in to book a lesson with ' + tutor?.user.firstName + '.'}</p>
                        )}
                    </div>
                    <div className='flex justify-end'>
                        <Calendar
                            minDate={date}
                            onClickDay={setSelectedDate}
                            value={selectedDate}
                            tileDisabled={tileDisabled}
                        />
                    </div>
                </div>
                <div className='border-t border-gray-400 mt-4 pt-4'>
                    {/* Book Button */}
                    {session ?
                        <button
                            onClick={handleBooking}
                            disabled={!selectedDate || !selectedTime}
                            style={{
                                padding: '12px 20px',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 5,
                                cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                                fontSize: 16,
                            }}
                        >
                            Book lesson
                        </button> : <button
                            onClick={handleSignIn}
                            disabled={!selectedDate || !selectedTime}
                            style={{
                                padding: '12px 20px',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 5,
                                cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                                fontSize: 16,
                            }}
                        >
                            Sign in
                        </button>}
                    <button onClick={handleBack}
                        style={{
                            padding: '12px 20px',
                            border: '1px solid gray',
                            color: '#000',
                            borderRadius: 5,
                            marginLeft: 8,
                            fontSize: 16,
                        }}
                    >
                        Go back
                    </button>
                </div>


            </div>
            <Toaster
                toastOptions={{
                    duration: 4000, // 4 seconds
                    style: {
                        background: '#333',
                        color: '#fff',
                        border: '1px solid #4ade80', // green border
                        borderRadius: '8px',
                        padding: '16px',
                        fontWeight: 'bold',
                    },
                    success: {
                        style: {
                            background: '#4ade80', // Tailwind green-400
                            color: '#000',
                        },
                    },
                    error: {
                        style: {
                            background: '#f87171', // Tailwind red-400
                            color: '#000',
                        },
                    },
                }}
            />
            {msgResult && msgResult == "Failed to create booking." ?
                <span className='block px-6 py-6 text-red-500 bg-gray-100'>{msgResult}</span> :
                msgResult &&
                <span className='block px-6 py-6 text-green-600 bg-gray-100'>{msgResult}</span>
            }
        </div>
    );
};

export default TutorBookingPage;
