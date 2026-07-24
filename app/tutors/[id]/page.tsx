'use client';

import ChatBooking, { Booking, Tutor } from '@/components/chatBooking';


const BookLessonPage = () => {
  // Dummy tutor
  const tutor: Tutor = {
    id: '1',
    name: 'John Doe',
  };

  // Dummy bookings
  const bookings: Booking[] = [
    { date: '2025-11-18', student: 'Alice', time: '10:00 AM' },
    { date: '2025-11-18', student: 'Bob', time: '2:00 PM' },
    { date: '2025-11-20', student: 'Charlie', time: '1:00 PM' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Book a Lesson</h1>
      <ChatBooking tutor={tutor} bookings={bookings} />
    </div>
  );
};

export default BookLessonPage;
