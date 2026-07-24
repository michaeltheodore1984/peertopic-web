'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { proposeLessonAction } from './actions';

interface Booking {
  id: string;
  date: string;
  startTime: string;
  duration: number;
}

interface TutorCalendarProps {
  tutorId: string;
  studentId: string;
}

export default function TutorCalendar({ tutorId, studentId }: TutorCalendarProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    fetch(`/api/bookings?tutorId=${tutorId}`)
      .then((res) => res.json())
      .then(setBookings);
  }, [tutorId]);

  const isDayFull = (date: Date) => {
    const d = date.toISOString().split('T')[0];
    return bookings.filter((b) => b.date === d).length >= 3;
  };

  const timeslots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  async function propose() {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toISOString().split('T')[0];

   /*  await proposeLessonAction({
      tutorId,
      studentId,
      date: dateStr,
      time: selectedTime,
    }); */
  }

  return (
    <div>
      <h3>Select a time to propose</h3>

      <Calendar
        onClickDay={setSelectedDate}
        tileDisabled={({ date }) => isDayFull(date)}
      />

      {selectedDate && (
        <div style={{ marginTop: '1rem' }}>
          <p>Selected: {selectedDate.toDateString()}</p>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {timeslots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                style={{
                  backgroundColor: selectedTime === slot ? 'green' : '#eee',
                  padding: '0.5rem',
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            onClick={propose}
          >
            Propose Time
          </button>
        </div>
      )}
    </div>
  );
}
