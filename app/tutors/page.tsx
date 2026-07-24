// 'use client';

// import { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// interface Booking {
//     date: string;      // YYYY-MM-DD
//     student: string;
//     time: string;
// }

// interface TutorCalendarProps {
//     bookings: Booking[];
//     onProposeDate: (dateStr: string, existingBookings: Booking[]) => void;
// }

// const TutorCalendar: React.FC<TutorCalendarProps> = ({ bookings, onProposeDate }) => {
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//     const handleDayClick = (date: Date) => {
//         setSelectedDate(date);

//         const dateStr = date.toISOString().split('T')[0];
//         const existingBookings = bookings.filter((b) => b.date === dateStr);
//         onProposeDate(dateStr, existingBookings);
//     };

//     return (
//         <Calendar
//             tileContent={({ date, view }) => {
//                 if (view === 'month') {
//                     const dateStr = date.toISOString().split('T')[0];
//                     const count = bookings.filter((b) => b.date === dateStr).length;

//                     if (count > 0) {
//                         return (
//                             <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
//                                 <span
//                                     style={{
//                                         backgroundColor: 'blue',
//                                         color: 'white',
//                                         borderRadius: '50%',
//                                         padding: '2px 6px',
//                                         fontSize: '0.7rem',
//                                     }}
//                                 >
//                                     {count}
//                                 </span>
//                             </div>
//                         );
//                     }
//                 }
//                 return null;
//             }}
//             onClickDay={handleDayClick}
//         />
//     );
// };

// export default TutorCalendar;

'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export interface Booking {
    date: string; // YYYY-MM-DD
    student: string;
    time: string; // e.g., "10:00 AM"
}

export interface StudentCalendarProps {
    bookings: Booking[]; // tutor bookings
    allTimeSlots: string[]; // e.g., ["10:00 AM", "11:00 AM", ...]
    onSelectSlot: (date: string, time: string) => void;
}

const StudentCalendar: React.FC<StudentCalendarProps> = ({ bookings, allTimeSlots, onSelectSlot }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Filter bookings for selected day
    const getBookingsForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return bookings.filter((b) => b.date === dateStr);
    };

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handleSlotClick = (time: string) => {
        if (!selectedDate) return;
        const dateStr = selectedDate.toISOString().split('T')[0];
        onSelectSlot(dateStr, time);
    };

    return (
        <div>
            <Calendar
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const count = getBookingsForDate(date).length;
                        if (count > 0) {
                            return (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                    <span
                                        style={{
                                            backgroundColor: 'blue',
                                            color: 'white',
                                            borderRadius: '50%',
                                            padding: '2px 6px',
                                            fontSize: '0.7rem',
                                        }}
                                    >
                                        {count}
                                    </span>
                                </div>
                            );
                        }
                    }
                    return null;
                }}
                onClickDay={handleDayClick}
            />

            {selectedDate && (
                <div style={{ marginTop: '1rem' }}>
                    <h4>Available time slots for {selectedDate.toDateString()}:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {allTimeSlots.map((slot) => {
                            const isBooked = getBookingsForDate(selectedDate).some((b) => b.time === slot);
                            return (
                                <button
                                    key={slot}
                                    disabled={isBooked}
                                    onClick={() => handleSlotClick(slot)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: isBooked ? '#ccc' : '#4caf50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: isBooked ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {slot} {isBooked ? '(Booked)' : ''}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCalendar;
