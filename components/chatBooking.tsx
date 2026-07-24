import React, { useState } from 'react';
import TutorCalendar from './tutorCalendar';


export interface Booking {
  date: string;
  student: string;
  time: string;
}

export interface Tutor {
  id: string;
  name: string;
}

interface ChatBookingProps {
  tutor: Tutor;
  bookings: Booking[];
}

const ChatBooking: React.FC<ChatBookingProps> = ({ tutor, bookings }) => {
  const [chatInput, setChatInput] = useState('');

  const handleProposeDate = (dateStr: string, existingBookings: Booking[]) => {
    if (existingBookings.length > 0) {
      alert(`Tutor already has ${existingBookings.length} booking(s) on this day.`);
    } else {
      setChatInput(`Proposed date: ${dateStr}`);
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;
    console.log(`Sending message: ${chatInput}`);
    setChatInput('');
  };

  return (
    <div>
      <h3>Book a lesson with {tutor.name}</h3>
      <TutorCalendar bookings={bookings} onProposeDate={handleProposeDate} />
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBooking;
